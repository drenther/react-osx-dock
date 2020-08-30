import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import useRaf from '@rooks/use-raf';

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
  const mouseX = useMotionValue(null);

  return (
    <div className="dock">
      <div
        className="icons"
        onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {images.map((image, index) => (
          <Img src={image} key={index} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
}

const baseWidth = 40;
const baseMargin = 5;
const distanceLimit = baseWidth * 6;
const distanceInput = [
  -distanceLimit,
  -distanceLimit / 1.25,
  -distanceLimit / 2,
  0,
  distanceLimit / 2,
  distanceLimit / 1.25,
  distanceLimit,
];
const widthOutput = [
  baseWidth,
  baseWidth * 1.3,
  baseWidth * 1.7,
  baseWidth * 2.5,
  baseWidth * 1.7,
  baseWidth * 1.3,
  baseWidth,
];

function Img({ src, mouseX }) {
  const distance = useMotionValue(distanceLimit + 1);
  const width = useSpring(useTransform(distance, distanceInput, widthOutput), {
    stiffness: 50,
  });

  const ref = useRef();

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      distance.set(mouseXVal - (rect.left + rect.width / 2));
      return;
    }

    distance.set(distanceLimit + 1);
  }, true);

  return (
    <motion.img
      ref={ref}
      src={src}
      style={{ width, margin: baseMargin, height: 'auto', originX: 1 }}
    />
  );
}
