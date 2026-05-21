"use client";

import CurvedLoop from "./curved-loop";

export default function CurvedLoopSection() {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-electric dark:bg-electric"
      style={{ borderTop: "3px solid #000", borderBottom: "3px solid #000" }}
    >
      <CurvedLoop
        marqueeText="WEB DEVELOPER ✦ UI DESIGNER ✦ REACT ✦ NEXT.JS ✦ TYPESCRIPT ✦ FRAMER MOTION ✦ OPEN TO WORK ✦"
        speed={2}
        curveAmount={250}
        direction="left"
        interactive={true}
        className="curved-loop-fill"
      />
    </section>
  );
}
