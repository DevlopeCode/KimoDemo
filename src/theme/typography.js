const {StyleSheet} = require('react-native');
const {ms} = require('react-native-size-matters');
const {Colors} = require('../assets/colors');
const {Fonts} = require('../assets/fonts');

export const TextVarient = {
  h1: {
    bold: {
      fontFamily: Fonts.bold,
      color: Colors.text,
      fontSize: ms(30),
    },
    semibold: {
      fontFamily: Fonts.semibold,
      color: Colors.text,
      fontSize: ms(30),
    },
    medium: {
      fontFamily: Fonts.medium,
      color: Colors.text,
      fontSize: ms(30),
    },
    regular: {
      fontFamily: Fonts.regular,
      color: Colors.text,
      fontSize: ms(30),
    },
  },
  h2: {
    bold: {
      fontFamily: Fonts.bold,
      color: Colors.text,
      fontSize: ms(26),
    },
    semibold: {
      fontFamily: Fonts.semibold,
      color: Colors.text,
      fontSize: ms(26),
    },
    medium: {
      fontFamily: Fonts.medium,
      color: Colors.text,
      fontSize: ms(26),
    },
    regular: {
      fontFamily: Fonts.regular,
      color: Colors.text,
      fontSize: ms(26),
    },
  },
  h3: {
    bold: {
      fontFamily: Fonts.bold,
      color: Colors.text,
      fontSize: ms(20),
    },
    semibold: {
      fontFamily: Fonts.semibold,
      color: Colors.text,
      fontSize: ms(20),
    },
    medium: {
      fontFamily: Fonts.medium,
      color: Colors.text,
      fontSize: ms(20),
    },
    regular: {
      fontFamily: Fonts.regular,
      color: Colors.text,
      fontSize: ms(20),
    },
  },
  h4: {
    bold: {
      fontFamily: Fonts.bold,
      color: Colors.text,
      fontSize: ms(18),
    },
    semibold: {
      fontFamily: Fonts.semibold,
      color: Colors.text,
      fontSize: ms(18),
    },
    medium: {
      fontFamily: Fonts.medium,
      color: Colors.text,
      fontSize: ms(18),
    },
    regular: {
      fontFamily: Fonts.regular,
      color: Colors.text,
      fontSize: ms(18),
    },
  },
};
