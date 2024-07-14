const COLORS = {
  primary: "#363636",
  secondary: "#242424",
  tertiary: "#FDAD9C",
  background: "#FDFDFD",
  gray: "#A8A8A8", // Neutral Light Gray
  gray2: "#E8E8E8", // Very Light Gray
  white: "#FFFFFF",         // White
  lightWhite: "#F5F5F5",    // Whisper Grey
  error: "#B00020"          // Strong Red
};

// primary: "#434848",       // Electric Violet
// secondary: "#888F8F",     // Tiffany Blue
// tertiary: "",      // Razzmatazz
// background: "#FDFDFD",

const FONT = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  bold: "Poppins-Bold",
};


const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
