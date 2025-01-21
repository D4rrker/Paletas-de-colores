"use client";

import ColorPalette from "../color-palette/component/ColorPalette";
import { InfiniteScroll } from "../global-functions/functionInfiniteScroll";

export default function AllMainPalets() {
  const loadMoreItems = (prevCount: number) => {
    return prevCount < 80 ? prevCount + 8 : prevCount;
  };

  return (
    <InfiniteScroll loadMoreItems={loadMoreItems} itemCount={8}>
      {(visibleCount) => (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] auto-rows-auto gap-10">
          {Array.from({ length: visibleCount }).map((_, index) => (
            <ColorPalette key={index} position={index} />
          ))}
        </div>
      )}
    </InfiniteScroll>
  );
}
