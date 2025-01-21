import { useState, useRef, useEffect, ReactNode } from "react";

interface TypeInfiniteScroll {
  loadMoreItems: (prevCount: number) => number;
  itemCount: number;
  children: (visibleCount: number) => ReactNode;
}

export const InfiniteScroll = ({
  loadMoreItems,
  itemCount,
  children,
}: TypeInfiniteScroll) => {
  const [visibleCount, setVisibleCount] = useState(itemCount);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const ldmRef = loadMoreRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prevCount) => {
            const newCount = loadMoreItems(prevCount);
            return newCount > 0 ? newCount : prevCount;
          });
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
  }, [loadMoreItems]);

  return (
    <>
      {children(visibleCount)}
      <div ref={loadMoreRef} style={{ height: "50px" }}></div>
    </>
  );
};
