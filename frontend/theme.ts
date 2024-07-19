import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const theme: ThemeOverride = extendTheme({
  styles: {
    global: {
      'html, body': {
        fontFamily: 'SUIT-Regular',
      },
    },
  },
  fonts: {},
  fontSizes: {},
  colors: {
    background: '#061627',
    white: '#FFFFFF',
    primary: '#1C99C3',
    second: '#354658',
    black: '#20243C',
    success: '#40BB82',
    update: '#FFC700',
    error: '#FF5757',
    muted: '#718096',
  },
});

export default theme;
