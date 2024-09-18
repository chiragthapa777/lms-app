import { useEffect, useRef } from "react";

function useUpdateEffect(effect: () => void, dependencies: any[]) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip the first render
      return;
    }
    // Call the effect function only when dependencies change after the first render
    effect();
  }, dependencies);
}

export default useUpdateEffect;
