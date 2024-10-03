import * as React from 'react';

export const DesconocidoIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{ width: '100%', height: 'auto' }}
    viewBox="0 0 500 500"
    {...props}
>
    <rect width="100%" height="100%" fill="#9e9e9e" />
    <g>
      <rect
        width={256}
        height={256}
        x={-128}
        y={-128}
        rx={0}
        ry={0}
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="translate(250 250) scale(1.875)"
      />
      <path
        d="M128 24a104 104 0 1 0 104 104A104.2 104.2 0 0 0 128 24Zm0 168a12 12 0 1 1 12-12 12 12 0 0 1-12 12Zm8-48.9v.9a8 8 0 0 1-16 0v-8a8 8 0 0 1 8-8 20 20 0 1 0-20-20 8 8 0 0 1-16 0 36 36 0 1 1 44 35.1Z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeDashoffset: 0,
          strokeLinejoin: "miter",
          strokeMiterlimit: 4,
          fill: "#fff",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="translate(10 10) scale(1.875)"
      />
    </g>
  </svg>
)