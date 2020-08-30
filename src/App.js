import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { clamp, distance } from 'popmotion';

import chrome from './logos/chrome.svg';
import docs from './logos/docs.svg';
import excel from './logos/excel.svg';
import gmail from './logos/gmail.svg';
import photoshop from './logos/photoshop.svg';
import powerpoint from './logos/powerpoint.svg';
import safari from './logos/safari.svg';
import slack from './logos/slack.svg';
import spotify from './logos/spotify.svg';
import steam from './logos/steam.svg';
import vlc from './logos/vlc.svg';

import './styles.css';

export default function App() {
  return (
    <div className="app">
      <Dock />
    </div>
  );
}

const images = [
  chrome,
  docs,
  excel,
  gmail,
  photoshop,
  powerpoint,
  safari,
  slack,
  spotify,
  steam,
  vlc,
];

function Dock() {
  const [mouseX, setMouseX] = useState();

  // console.log(mouseX);

  return (
    <div className="dock">
      <div
        className="icons"
        onMouseOver={(event) => setMouseX(event.nativeEvent.x)}
        onMouseLeave={() => setMouseX(null)}
      >
        {images.map((image, index) => (
          <Img src={image} key={index} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
}

function useCenterX() {
  const [x, updateX] = useState();

  const ref = useRef();

  useEffect(() => {
    // console.log(ref.current);
    updateX(
      ref.current?.getBoundingClientRect().left +
        ref.current?.getBoundingClientRect().width / 2
    );
  });

  return {
    ref,
    x,
  };
}

const baseWidth = 40;
const baseMargin = 5;
const validDistanceOffset = baseWidth * 3.5 + baseMargin * 6;

function Img({ src, mouseX }) {
  const { ref, x } = useCenterX();
  const controls = useAnimation();

  // const d = distance(x ?? 0, mouseX ?? 0);
  // const c = clamp(0, validDistanceOffset, d);
  // console.log({
  //   src,
  //   d,
  //   c,
  //   scaleFactor: c / validDistanceOffset,
  // });

  useEffect(() => {
    const scaledWidth =
      mouseX && x
        ? baseWidth *
          (2 -
            clamp(0, validDistanceOffset, distance(x, mouseX)) /
              validDistanceOffset)
        : baseWidth;

    controls.start({
      width: scaledWidth,
      transition: {
        stiffness: 200,
        velocity: 10,
      },
    });
  }, [x, mouseX]);

  return (
    <motion.img
      ref={ref}
      src={src}
      animate={controls}
      style={{ width: baseWidth, margin: baseMargin, height: 'auto' }}
    />
  );
}

// function Icon({ children, focused, setFocusedIndex, index })

//   return <motion.div layoutId={index} style={{  }} onMouseEnter={() => setFocusedIndex(index)} onMouseLeave={() => setFocusedIndex(null)}>
//       {}
//     </motion.div>
// }

// function Icon({ children, focused, setFocusedIndex, index }) {
//   const controls = useAnimation();

//   useEffect(() => {
//     const scale = calculateScaleFactor(focused, index);

//     controls.start({ scale, padding: 5 });
//   }, [focused, controls, index]);

//   return (
//     <motion.div
//       whileHover={{ scale: 1.75 }}
//       onMouseEnter={() => setFocusedIndex(index)}
//       onMouseLeave={() => setFocusedIndex(null)}
//       initial={{ scale: 1 }}
//       style={{ originY: 1 }}
//       animate={controls}
//     >
//       {children}
//     </motion.div>
//   );
// }
