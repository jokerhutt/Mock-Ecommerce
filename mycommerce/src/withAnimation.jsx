import React, { useRef, useLayoutEffect, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// Higher-order component to add animation
const withAnimation = (Component) => ({ items, delayPerPixel = 0.0008, ...props }) => {
  const originOffset = useRef({ top: 0, left: 0 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [items]); // Re-animate when the items change

  return (
    <motion.div initial="hidden" animate={controls} variants={{}}>
      {items.map((item, i) => (
        <AnimatedItem
          key={i}
          i={i}
          originIndex={Math.floor(items.length / 2)} // Center of the grid
          delayPerPixel={delayPerPixel}
          originOffset={originOffset}
        >
          <Component {...props} item={item} />
        </AnimatedItem>
      ))}
    </motion.div>
  );
};

const AnimatedItem = ({ delayPerPixel, i, originIndex, originOffset, children }) => {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft
    };

    if (i === originIndex) {
      originOffset.current = offset.current;
    }
  }, [delayPerPixel]);

  useEffect(() => {
    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, [delayPerPixel]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: delayRef.current } }}
    >
      {children}
    </motion.div>
  );
};

export default withAnimation;