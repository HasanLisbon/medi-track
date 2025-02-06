import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const SCALE = SCREEN_WIDTH > SCREEN_HEIGHT ? SCREEN_HEIGHT : SCREEN_WIDTH;
const BASE_WIDTH = 375; // Base width for scaling (e.g., iPhone 6/7/8)

const sizeConfig = {
  phone: {
    small: { min: 0.8, max: 1 },
    medium: { min: 0.9, max: 1.1 },
    large: { min: 1, max: 1.2 },
  },
  tablet: {
    small: { min: 1.3, max: 1.4 },
    medium: { min: 1.4, max: 1.5 },
    large: { min: 1.5, max: 1.7 },
  },
};

export const getDeviceType = () => {
  const pixelDensity = PixelRatio.get();
  const adjustedWidth = SCREEN_WIDTH * pixelDensity;
  const adjustedHeight = SCREEN_HEIGHT * pixelDensity;
  if (pixelDensity < 2 && (adjustedWidth >= 1000 || adjustedHeight >= 1000)) {
    return "tablet";
  } else if (
    pixelDensity === 2 &&
    (adjustedWidth >= 1920 || adjustedHeight >= 1920)
  ) {
    return "tablet";
  } else {
    return "phone";
  }
};

const getScreenSizeCategory = () => {
  if (SCALE < 350) return "small";
  if (SCALE > 500) return "large";
  return "medium";
};

export const getResponsiveSize = (size) => {
  const deviceType = getDeviceType();
  const screenCategory = getScreenSizeCategory();
  const config = sizeConfig[deviceType][screenCategory];

  const scaleFactor = SCALE / BASE_WIDTH;
  const clampedScaleFactor = Math.min(
    Math.max(scaleFactor, config.min),
    config.max
  );
  let newSize = size * clampedScaleFactor;
  if (deviceType === "tablet") {
    newSize *= 1.1; // Increase tablet sizes by an additional 10%
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Helper function for responsive padding, margin, width, height, etc.
export const responsiveSize = (value) => {
  return getResponsiveSize(value);
};
