/**
 * Building types S3 lists under "What We Deliver" on its existing site.
 * Copy is rewritten from that section. Photography is representative
 * (Unsplash) — it illustrates the typology, not a completed S3 project.
 */
import type { MediaKey } from "./media";

export type Typology = {
  index: string;
  name: string;
  line: string;
  body: string;
  image: MediaKey;
  imageAlt: string;
};

export const typologies: Typology[] = [
  {
    index: "01",
    name: "Independent houses",
    line: "Planned around your family's routines.",
    body: "Homes with the design sensibility to stay relevant for generations — tailored to your plot, budget and the way you live.",
    image: "typology-independent-house",
    imageAlt: "Contemporary two-storey house with white rendered walls and a timber-clad volume under a clear sky",
  },
  {
    index: "02",
    name: "Villas",
    line: "Luxury that still works every day.",
    body: "Expansive, light-filled villas that balance generous living spaces with practical, functional planning.",
    image: "typology-villa",
    imageAlt: "White modern villa with timber soffits, floor-to-ceiling glazing and a reflecting pool",
  },
  {
    index: "03",
    name: "Duplex houses",
    line: "Two levels, clearly zoned.",
    body: "Shared spaces below, private rooms above — duplex homes delivered with a full set of features within an agreed schedule.",
    image: "typology-duplex",
    imageAlt: "Two-storey white duplex house with a cantilevered upper floor and deep blue sky",
  },
  {
    index: "04",
    name: "Bungalows",
    line: "A signature of their own.",
    body: "Single-family bungalows designed through careful innovation, so each one feels distinct and generous.",
    image: "typology-bungalow",
    imageAlt: "Whitewashed cubic bungalow with a garden path and shade trees",
  },
  {
    index: "05",
    name: "Apartments",
    line: "Every square foot, working hard.",
    body: "Efficient apartment planning that never trades away natural light, ventilation or comfort.",
    image: "typology-apartment",
    imageAlt: "White residential apartment tower with stacked balconies against a blue sky",
  },
  {
    index: "06",
    name: "Row houses",
    line: "Built in clear, seamless phases.",
    body: "Classic or contemporary, row-house plans are organised into phases so complex projects are delivered smoothly.",
    image: "typology-row-house",
    imageAlt: "Narrow modern townhouse with a lit entrance and integrated garage at dusk",
  },
];
