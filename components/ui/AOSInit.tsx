'use client';
import { useEffect } from 'react';
import htmlAos from 'aos';
import 'aos/dist/aos.css';

export default function AOSInit() {
  useEffect(() => {
    htmlAos.init({
      once: true,
      duration: 800,
      easing: 'ease-out-cubic',
    });
  }, []);
  return null;
}
