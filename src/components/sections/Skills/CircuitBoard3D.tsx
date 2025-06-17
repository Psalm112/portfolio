'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@/hooks/useGSAP';

interface Component {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'ic' | 'resistor' | 'capacitor' | 'led' | 'connector';
  label: string;
}

const components: Component[] = [
  { x: 200, y: 150, width: 60, height: 40, type: 'ic', label: 'MCU' },
  { x: