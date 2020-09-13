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

export default function App() {
  return (
    <div className="app">
      <Dock />
    </div>
  );
}

function Dock() {
  const mouseX = useMotionValue(null);

  return (
    <>
      <div className="credits">
        All the icons are from{' '}
        <a
          href="https://www.flaticon.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Flaticon
        </a>
      </div>
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
    </>
  );
}

const baseWidth = 40;
const distanceLimit = baseWidth * 6;
const beyondTheDistanceLimit = distanceLimit + 1;
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
  const distance = useMotionValue(beyondTheDistanceLimit);
  const width = useSpring(useTransform(distance, distanceInput, widthOutput), {
    damping: 25,
    stiffness: 250,
  });

  const ref = useRef();

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      const imgCenterX = rect.left + rect.width / 2;

      distance.set(mouseXVal - imgCenterX);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return <motion.img ref={ref} src={src} className="icon" style={{ width }} />;
}
