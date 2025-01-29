const mapColorsToMui = (appColors) => {
  return {
    primary: {
      main: appColors.primary,
    },
    secondary: {
      main: appColors.secondary,
    },
    background: {
      default: appColors.background,
    },
    text: {
      primary: appColors.textPrimary,
      secondary: appColors.textSecondary,
    },
  };
};

module.exports = mapColorsToMui;
