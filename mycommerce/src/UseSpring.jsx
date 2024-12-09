import { useTrail, a } from '@react-spring/web';
import React from 'react';
import styles from './styles.module.css';

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 200, friction: 100 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    from: { opacity: 0, x: 20 },
  });

  return (
    <div>
      {trail.map(({ x, ...style }, index) => (
        <a.div
          key={index}
          className={styles.trailsText}
          style={{
            ...style,
            transform: x.to(x => `translate3d(${x}px,0, 0)`),
          }}
        >
          {items[index]}
        </a.div>
      ))}
    </div>
  );
};

export default Trail;