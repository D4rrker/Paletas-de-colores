"use client";

import { useState, useRef, useEffect } from "react";
import ColorPalette from "../color-palette/component/ColorPalette";

export default function AllMainPalets() {
  const [visibleCount, setVisibleCount] = useState(8);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const ldmRef = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prevCount) =>
            prevCount < 80 ? prevCount + 8 : prevCount
          );
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 }
    );

    if (ldmRef) {
      observer.observe(ldmRef);
    }

    return () => {
      if (ldmRef) {
        observer.unobserve(ldmRef);
      }
    };
  }, []);

  return (
    <div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] auto-rows-auto gap-10">
        {Array.from({ length: visibleCount }).map((_, index) => (
          <ColorPalette key={index} position={index} />
        ))}
      </div>
      <div ref={loadMoreRef} style={{ height: "50px" }}></div>
    </div>
  );
}
