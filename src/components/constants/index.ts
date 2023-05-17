const BASE_SIZE = 14;
class Constants {
  static borderRadius = {
    'rounded': 9999999,
    'xs': BASE_SIZE * 0.325,
    'sm': BASE_SIZE * 0.625,
    'md': BASE_SIZE,
    'mmd': BASE_SIZE * 1.1,
    'lg': BASE_SIZE * 1.325,
    'xl': BASE_SIZE * 1.625,
    '2xl': BASE_SIZE * 2,
  };
  static color = {
    'primary': {
      normal: '#f69435',
    },
    'secondary': {},
    'white': {
      normal: 'white',
    },
    'black': {
      normal: '#101820FF',
      light: 'rgba(16,24,32,0.75)',
      lighter: 'rgba(16,24,32,0.5)',
      moreLight: 'rgba(16,24,32,0.25)',
    },
    'red': {
      normal: 'red',
      darker: '#a83e32',
    },
    'gray': {
      lightest: '#dcdcdc',
      lighter: '#d3d3d3',
      light: '#c0c0c0',
      darker: '#808080',
      dark: '#696969',
      normal: '#a9a9a9',
    },
    'blue': {
      normal: 'blue',
    },
    'midnightblue': {
      normal: 'midnightblue',
    },
    'blue-sky': { normal: '#2678f2' },
  };
  static bg = {
    addToCartButton: {
      productPage: '#ebeef5',
    },
  };
  static fontSize = {
    'base': BASE_SIZE,
    'xs': BASE_SIZE * 0.625,
    'sm': BASE_SIZE * 0.775,
    '2sm': BASE_SIZE * 0.825,
    'md': BASE_SIZE * 1.125,
    'lg': BASE_SIZE * 1.225,
    'xl': BASE_SIZE * 1.5,
    '2xl': BASE_SIZE * 1.75,
    '3xl': BASE_SIZE * 2,
  };
  static alignSize = {
    1: BASE_SIZE * 0.25,
    2: BASE_SIZE * 0.5,
    3: BASE_SIZE * 0.75,
    4: BASE_SIZE,
    5: BASE_SIZE * 1.25,
    6: BASE_SIZE * 1.5,
    7: BASE_SIZE * 1.75,
    8: BASE_SIZE * 2,
  };
  static my = {
    1: {
      marginTop: this.alignSize[1],
      marginBottom: this.alignSize[1],
    },
    2: {
      marginTop: this.alignSize[2],
      marginBottom: this.alignSize[2],
    },
    3: {
      marginTop: this.alignSize[3],
      marginBottom: this.alignSize[3],
    },
    4: {
      marginTop: this.alignSize[4],
      marginBottom: this.alignSize[4],
    },
    5: {
      marginTop: this.alignSize[5],
      marginBottom: this.alignSize[5],
    },
    6: {
      marginTop: this.alignSize[6],
      marginBottom: this.alignSize[6],
    },
    7: {
      marginTop: this.alignSize[8],
      marginBottom: this.alignSize[8],
    },
    8: {
      marginTop: this.alignSize[8],
      marginBottom: this.alignSize[8],
    },
  };
  static py = {
    1: {
      paddingTop: this.alignSize[1],
      paddingBottom: this.alignSize[1],
    },
    2: {
      paddingTop: this.alignSize[2],
      paddingBottom: this.alignSize[2],
    },
    3: {
      paddingTop: this.alignSize[3],
      paddingBottom: this.alignSize[3],
    },
    4: {
      paddingTop: this.alignSize[4],
      paddingBottom: this.alignSize[4],
    },
    5: {
      paddingTop: this.alignSize[5],
      paddingBottom: this.alignSize[5],
    },
    6: {
      paddingTop: this.alignSize[6],
      paddingBottom: this.alignSize[6],
    },
    7: {
      paddingTop: this.alignSize[8],
      paddingBottom: this.alignSize[8],
    },
    8: {
      paddingTop: this.alignSize[8],
      paddingBottom: this.alignSize[8],
    },
  };
  static px = {
    1: {
      paddingLeft: this.alignSize[1],
      paddingRight: this.alignSize[1],
    },
    2: {
      paddingLeft: this.alignSize[2],
      paddingRight: this.alignSize[2],
    },
    3: {
      paddingLeft: this.alignSize[3],
      paddingRight: this.alignSize[3],
    },
    4: {
      paddingLeft: this.alignSize[4],
      paddingRight: this.alignSize[4],
    },
    5: {
      paddingLeft: this.alignSize[5],
      paddingRight: this.alignSize[5],
    },
    6: {
      paddingLeft: this.alignSize[6],
      paddingRight: this.alignSize[6],
    },
    7: {
      paddingLeft: this.alignSize[8],
      paddingRight: this.alignSize[8],
    },
    8: {
      paddingLeft: this.alignSize[8],
      paddingRight: this.alignSize[8],
    },
  };
  static button_color = '#FF9900';
  static button_disable_color = '#999999';
  static line_color = '#555555';
  static border_color = '#333333';
  static error_border_color = '#DD0000';
  static success_border_color = '#009900';
  static button_background_color = '#f69435';

  static button = {
    height: {
      primary: 45,
    },
    color: {
      primary: this.color.primary.normal,
      disabled: this.button_disable_color,
    },
  };

  static boxShadow = {
    xs: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.16,
      shadowRadius: 1.51,
      elevation: (BASE_SIZE * 0.25) / 2,
    },
    sm: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: BASE_SIZE * 0.25,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 5.62,
      elevation: BASE_SIZE * 0.5,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.23,
      shadowRadius: 11.27,
      elevation: BASE_SIZE,
    },
    xl: {
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 15,
      },
      shadowOpacity: 0.24,
      shadowRadius: 16.41,
      elevation: 20,
    },
  };

  static tierPriceMessageTemplate = ['Buy ', '%{qty}%', ' for ', '%{final_price}%', ' each and save ', '%{discount}%'];
  static useAnimation = true;
  static seperatorHeight = this.alignSize[1];
}
export default Constants;
