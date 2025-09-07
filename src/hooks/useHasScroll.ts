import { useLayoutEffect, useState } from 'react';

type Edges = { left: boolean; right: boolean; top: boolean; bottom: boolean };
interface State {
  hasX: boolean;
  hasY: boolean;
  edges: Edges;
}

export default function useHasScroll(
  ref: React.RefObject<HTMLElement>,
  observeMutations: boolean,
): State {
  const [state, setState] = useState<State>({
    hasX: false,
    hasY: false,
    edges: { left: false, right: false, top: false, bottom: false },
  });

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    let raf = 0;
    const EPS = 1; // 소수점/줌으로 인한 경계 흔들림 보정

    const compute = () => {
      const {
        scrollLeft,
        scrollTop,
        scrollWidth,
        scrollHeight,
        clientWidth,
        clientHeight,
      } = element;

      const maxX = Math.max(0, scrollWidth - clientWidth);
      const maxY = Math.max(0, scrollHeight - clientHeight);

      const hasX = scrollWidth > clientWidth + EPS;
      const hasY = scrollHeight > clientHeight + EPS;

      const edges: Edges = {
        left: hasX && scrollLeft > EPS,
        right: hasX && scrollLeft < maxX - EPS,
        top: hasY && scrollTop > EPS,
        bottom: hasY && scrollTop < maxY - EPS,
      };

      return { hasX, hasY, edges };
    };

    const setIfChanged = (next: State) =>
      setState((prev) =>
        prev.hasX === next.hasX &&
        prev.hasY === next.hasY &&
        prev.edges.left === next.edges.left &&
        prev.edges.right === next.edges.right &&
        prev.edges.top === next.edges.top &&
        prev.edges.bottom === next.edges.bottom
          ? prev
          : next,
      );

    const run = () => setIfChanged(compute());

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(run);
    };

    // 초기(페인트 전) 1회 측정
    run();

    // 변화에 반응
    element.addEventListener('scroll', schedule, { passive: true });

    const ro = new ResizeObserver(schedule);
    ro.observe(element);

    // 콘텐츠 길이 변동 대응(자식/텍스트/속성 변경)
    const mo = observeMutations ? new MutationObserver(schedule) : null;
    mo?.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });

    // 뷰포트 리사이즈도 간접 영향
    window.addEventListener('resize', schedule);

    return () => {
      cancelAnimationFrame(raf);
      element.removeEventListener('scroll', schedule);
      ro.disconnect();
      mo?.disconnect();
      window.removeEventListener('resize', schedule);
    };
  }, [ref, observeMutations]);

  return {
    hasX: state.hasX,
    hasY: state.hasY,
    edges: state.edges,
  };
}
