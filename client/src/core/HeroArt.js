import React from 'react';

/**
 * Decorative hero illustration. Pure SVG, no data and no external assets, so
 * it renders instantly and never depends on catalogue content.
 */
const HeroArt = () => (
  <svg
    className='hero-svg'
    viewBox='0 0 500 420'
    role='presentation'
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <radialGradient id='ha-glow' cx='50%' cy='50%' r='50%'>
        <stop offset='0%' stopColor='#6366f1' stopOpacity='0.55' />
        <stop offset='55%' stopColor='#4f46e5' stopOpacity='0.18' />
        <stop offset='100%' stopColor='#4f46e5' stopOpacity='0' />
      </radialGradient>

      <linearGradient id='ha-card' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#ffffff' stopOpacity='0.16' />
        <stop offset='100%' stopColor='#ffffff' stopOpacity='0.03' />
      </linearGradient>

      <linearGradient id='ha-bag' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#a5b4fc' />
        <stop offset='100%' stopColor='#38bdf8' />
      </linearGradient>

      <linearGradient id='ha-accent' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#38bdf8' />
        <stop offset='100%' stopColor='#6366f1' />
      </linearGradient>

      <linearGradient id='ha-ring' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset='0%' stopColor='#ffffff' stopOpacity='0.55' />
        <stop offset='100%' stopColor='#ffffff' stopOpacity='0' />
      </linearGradient>
    </defs>

    {/* ambient glow */}
    <circle cx='250' cy='210' r='190' fill='url(#ha-glow)' />

    {/* concentric rings */}
    <circle cx='250' cy='210' r='176' fill='none' stroke='#ffffff' strokeOpacity='0.08' />
    <circle
      className='ha-spin'
      cx='250'
      cy='210'
      r='148'
      fill='none'
      stroke='#ffffff'
      strokeOpacity='0.22'
      strokeWidth='1.5'
      strokeDasharray='3 12'
      strokeLinecap='round'
    />
    <circle
      cx='250'
      cy='210'
      r='120'
      fill='none'
      stroke='url(#ha-ring)'
      strokeWidth='1.5'
      strokeOpacity='0.6'
    />

    {/* central glass card with a shopping bag mark */}
    <g className='ha-float'>
      <rect
        x='168'
        y='104'
        width='164'
        height='212'
        rx='30'
        fill='url(#ha-card)'
        stroke='#ffffff'
        strokeOpacity='0.24'
      />

      <path
        d='M232 162v-14a18 18 0 0 1 36 0v14'
        fill='none'
        stroke='#ffffff'
        strokeOpacity='0.85'
        strokeWidth='6'
        strokeLinecap='round'
      />
      <rect x='212' y='162' width='76' height='88' rx='16' fill='url(#ha-bag)' />
      <circle cx='234' cy='188' r='4.5' fill='#ffffff' fillOpacity='0.85' />
      <circle cx='266' cy='188' r='4.5' fill='#ffffff' fillOpacity='0.85' />

      <rect x='204' y='270' width='92' height='10' rx='5' fill='#ffffff' fillOpacity='0.3' />
      <rect x='204' y='290' width='58' height='8' rx='4' fill='#ffffff' fillOpacity='0.16' />
    </g>

    {/* floating accents */}
    <g className='ha-float-b'>
      <rect x='84' y='120' width='62' height='62' rx='20' fill='url(#ha-accent)' />
      <path
        d='M104 151l8 8 16-17'
        fill='none'
        stroke='#ffffff'
        strokeWidth='5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>

    <g className='ha-float-c'>
      <circle
        cx='386'
        cy='292'
        r='22'
        fill='#ffffff'
        fillOpacity='0.1'
        stroke='#ffffff'
        strokeOpacity='0.3'
      />
      <path
        d='M379 292h14M386 285v14'
        stroke='#ffffff'
        strokeOpacity='0.75'
        strokeWidth='3'
        strokeLinecap='round'
      />
    </g>

    <circle className='ha-float-c' cx='372' cy='118' r='8' fill='url(#ha-accent)' />
    <circle className='ha-float-b' cx='118' cy='306' r='11' fill='#ffffff' fillOpacity='0.22' />
    <circle cx='320' cy='72' r='5' fill='#ffffff' fillOpacity='0.35' />
    <circle cx='150' cy='250' r='4' fill='#ffffff' fillOpacity='0.28' />
  </svg>
);

export default HeroArt;
