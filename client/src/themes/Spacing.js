export const SPACING = {
  // Base values
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,

  scale: (factor) => factor * 8,

  tiny: 2,
  base: 12,
  extraSmall: 6,
  mediumLarge: 20,
  huge: 48,
  massive: 64,

  mobile: {
    padding: 8,
    margin: 8,
    gap: 4,
  },
  tablet: {
    padding: 16,
    margin: 16,
    gap: 8,
  },
  desktop: {
    padding: 24,
    margin: 24,
    gap: 16,
  },

  buttons: {
    small: 8,
    medium: 16,
    large: 24,
  },
  cards: {
    padding: 16,
    margin: 16,
  },
  inputs: {
    padding: 12,
    margin: 8,
  },

  vertical: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  horizontal: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};
