import { ViewTransition } from "react";

/**
 * Templates remount on every navigation, so the page content gets enter/exit
 * view transitions while the persistent header stays anchored.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
