"use client";

import { useEffect, useRef } from "react";
import { loaderDelay } from "@/lib/motion";

const VERT = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Soft drifting cloud wisps + a faint sun bloom, premultiplied. `d` blends day → dusk.
const FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 r;uniform float t;uniform float d;
float h(vec2 p){vec3 q=fract(vec3(p.xyx)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r;
  vec2 p=vec2(uv.x*r.x/r.y,uv.y)*vec2(1.,2.1);
  float s=t*.016;
  float c=fbm(p*1.7+vec2(s,-s*.2));
  c+=.45*fbm(p*3.6+vec2(s*1.7,s*.35)+c);
  float clouds=smoothstep(.8,1.2,c)*smoothstep(.2,.65,uv.y);
  float haze=smoothstep(.5,0.,uv.y)*.08;
  float sun=.14*exp(-5.5*distance(uv*vec2(r.x/r.y,1.),vec2(.88*r.x/r.y,1.02)))*(1.-d);
  float a=clamp(clouds*mix(.38,.3,d)+haze*(1.-d*.5)+sun,0.,.5);
  // Dusk: clouds pick up the last warm light from below, cooler above.
  vec3 col=mix(vec3(1.),mix(vec3(1.,.62,.5),vec3(.62,.6,.86),smoothstep(.35,.95,uv.y)),d);
  gl_FragColor=vec4(col*a,a);
}`;

// Dusk amount (0–1) set by the hero's scroll sequence; read every frame.
let dusk = 0;
let redraw: (() => void) | null = null;
export function setSkyDusk(value: number) {
  if (Math.abs(value - dusk) < 0.002) return;
  dusk = value;
  redraw?.();
}

/**
 * Lightweight procedural sky (≈2 KB) used instead of Vanta.js: no three.js,
 * one small canvas at reduced resolution, ~30 fps, paused off-screen.
 * Small screens, low-memory devices and reduced-motion users get one static frame.
 */
export function SkyCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const lowEnd = nav.connection?.saveData || (nav.deviceMemory !== undefined && nav.deviceMemory < 4);
    const animate = !(reduce || small || lowEnd);

    let gl: WebGLRenderingContext | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uDusk: WebGLUniformLocation | null = null;
    let raf = 0;
    let cancelled = false;
    let visible = true;
    let last = 0;
    const start = performance.now() - 40000; // start mid-drift, not from a blank sky
    const scale = 0.45; // clouds are soft — render small, let CSS upscale.

    // Never show a canvas we can't draw into: a lost context paints solid white.
    const show = (on: boolean) => {
      canvas.dataset.ready = on ? "true" : "false";
    };

    // Compile without blocking the main thread where the browser allows it.
    const init = (): Promise<boolean> =>
      new Promise((resolve) => {
        gl = canvas.getContext("webgl", { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: "low-power" });
        if (!gl || gl.isContextLost()) return resolve(false);
        const g = gl;
        const compile = (type: number, src: string) => {
          const sh = g.createShader(type)!;
          g.shaderSource(sh, src);
          g.compileShader(sh);
          return sh;
        };
        const prog = g.createProgram()!;
        g.attachShader(prog, compile(g.VERTEX_SHADER, VERT));
        g.attachShader(prog, compile(g.FRAGMENT_SHADER, FRAG));
        g.linkProgram(prog);
        const parallel = g.getExtension("KHR_parallel_shader_compile") as { COMPLETION_STATUS_KHR: number } | null;
        const finish = () => {
          if (cancelled || !g.getProgramParameter(prog, g.LINK_STATUS)) return resolve(false);
          g.useProgram(prog);
          g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer());
          g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
          const loc = g.getAttribLocation(prog, "p");
          g.enableVertexAttribArray(loc);
          g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);
          uRes = g.getUniformLocation(prog, "r");
          uTime = g.getUniformLocation(prog, "t");
          uDusk = g.getUniformLocation(prog, "d");
          resolve(true);
        };
        if (!parallel) return finish();
        const poll = () => {
          if (cancelled) return resolve(false);
          if (g.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR)) finish();
          else setTimeout(poll, 50);
        };
        poll();
      });

    const resize = () => {
      if (!gl) return;
      const w = Math.max(2, Math.round(canvas.clientWidth * scale));
      const h = Math.max(2, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };

    const draw = (now: number) => {
      if (!gl || gl.isContextLost()) return;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uDusk, dusk);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!visible || document.hidden || now - last < 33) return;
      last = now;
      draw(now);
    };

    const boot = async () => {
      if (!(await init())) return show(false);
      resize();
      draw(performance.now());
      show(true);
      // Static skies still follow the dusk scroll: redraw one frame per change.
      if (!animate) redraw = () => requestAnimationFrame(() => draw(performance.now()));
      if (animate) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(loop);
      }
    };

    const onLost = (e: Event) => {
      e.preventDefault(); // ask the browser to restore the context
      cancelAnimationFrame(raf);
      show(false);
    };
    const onResize = () => {
      resize();
      draw(performance.now());
    };
    canvas.addEventListener("webglcontextlost", onLost);
    const onRestored = () => void boot();
    canvas.addEventListener("webglcontextrestored", onRestored);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    // Start once the entrance has played and the main thread is idle, so the
    // shader never competes with first paint or the intro.
    const firstVisit = !document.documentElement.classList.contains("intro-seen");
    const idle = (cb: () => void) => {
      // Safari has no requestIdleCallback.
      const w = window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number };
      if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1500 });
      else window.setTimeout(cb, 200);
    };
    const startTimer = window.setTimeout(() => idle(() => void boot()), loaderDelay() + (firstVisit ? 2600 : 1200));

    return () => {
      cancelled = true;
      redraw = null;
      window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
