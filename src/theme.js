import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'turquoise',
  colors: {
    turquoise: [
      '#e6fffe',
      '#c7fffe',
      '#8ffffe',
      '#54fffe',
      '#2cfffd',
      '#00d1d1', // Primary - index 5
      '#00b8b8',
      '#009f9f',
      '#008686',
      '#006d6d'
    ],
    navy: [
      '#e8ebed',
      '#d1d6da',
      '#bac1c7',
      '#a3acb4',
      '#8c97a1',
      '#1B2B34', // Primary - index 5
      '#18262e',
      '#152128',
      '#121c22',
      '#0f171c'
    ],
    solar: [
      '#fffbee',
      '#fff7dd',
      '#fff3cc',
      '#ffefbb',
      '#ffebaa',
      '#FFD447', // Primary - index 5
      '#e6bf40',
      '#ccaa39',
      '#b39532',
      '#99802b'
    ]
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: 700
  },
  defaultRadius: 'md',
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
});