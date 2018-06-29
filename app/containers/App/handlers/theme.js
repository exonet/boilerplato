import createTheme from 'spectacle/lib/themes/default';

export default createTheme(
  {
    primary: '#E3E3E3',
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
