"use client";

import "@/lib/react-polyfill";
import { VisualEditing } from "next-sanity/visual-editing";

export default function VisualEditingComponent() {
  // Enable live mode in the browser
  return <VisualEditing />;
}
