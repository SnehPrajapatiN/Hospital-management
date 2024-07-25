// src/hooks/useLocoScroll.js
import { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/src/locomotive-scroll.scss';

const useLocoScroll = (start) => {
  useEffect(() => {
    if (!start) return;

    const scrollEl = document.querySelector('.smooth-scroll');

    const locoScroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1.2,
    });

    return () => {
      if (locoScroll) locoScroll.destroy();
    };
  }, [start]);
};

export default useLocoScroll;
