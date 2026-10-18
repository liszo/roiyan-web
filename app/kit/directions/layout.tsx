import type { Metadata } from "next";
import type { ReactNode } from "react";

// Kit pages: visual-direction previews for guide 24 step 4.3. Not indexed; delete the
// unchosen directions after DESIGN.md §12 is written (step 4.4).
export const metadata: Metadata = {
  title: "جهت‌های بصری · کیت",
  robots: { index: false, follow: false },
};

export default function DirectionsLayout({ children }: { children: ReactNode }) {
  return children;
}
