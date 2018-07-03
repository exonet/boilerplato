import createTheme from 'spectacle/lib/themes/default';

export const primaryColor = '#E3E3E3';

const retroGifIds = [1589, 1595, 1592, 1569, 1562, 1565, 1549, 1546];
export const retroImage = () => (
  `http://replygif.net/i/${retroGifIds[Math.floor(Math.random() * retroGifIds.length)]}.gif`
);

export const endGifIds = [183, 1196, 432, 628, 1294, 633, 95, 911];
export const endImage = () => (
  `http://replygif.net/i/${endGifIds[Math.floor(Math.random() * endGifIds.length)]}.gif`
);

export default createTheme(
  {
    primary: primaryColor,
    secondary: '#333333',
    tertiary: '#333333',
  },
  {
    primary: 'Helvetica',
    secondary: {
      name: 'Droid Serif',
      googleFont: true,
      styles: ['400', '700i'],
    },
  },
);
