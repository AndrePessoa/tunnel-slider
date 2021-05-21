import { useState, useRef, useCallback } from "react";

const EasingFunctions = {
  // no easing, no acceleration
  linear: (t) => t,
  // accelerating from zero velocity
  easeInQuad: (t) => t * t,
  // decelerating to zero velocity
  easeOutQuad: (t) => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  easeInCubic: (t) => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: (t) => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: (t) => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: (t) => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  // accelerating from zero velocity
  easeInQuint: (t) => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: (t) => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
};

function useAnimatedState(initValue, time, easing = "linear") {
  const animationFrame = useRef();
  const [value, setValue] = useState(initValue);

  const setAnimatedFunction = useCallback(
    (targetValue) => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame);
      }

      const startTime = Date.now();
      const initValue = value;
      const endValue = targetValue;
      const animatedValue = endValue - initValue;

      function loop() {
        animationFrame.current = requestAnimationFrame(onFrame);
      }

      function onFrame() {
        const currTime = Date.now();
        const currProp = (currTime - startTime) / time;
        setValue(
          initValue +
            animatedValue * (EasingFunctions[easing](currProp) || currProp)
        );

        if (Math.abs(Math.round(currProp * 100) / 100) < 1) loop();
      }

      loop();
    },
    [value, time, easing]
  );

  return [value, setAnimatedFunction];
}

export default useAnimatedState;
