import '@emotion/react';
import { ColorsTypes, FontSizeTypes, HeightsTypes } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: ColorsTypes;
    fontSizes: FontSizeTypes;
    heights: HeightsTypes;
  }
}
