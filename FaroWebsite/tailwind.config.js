/* eslint-disable no-undef */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'xs': { max: '375px' },
      'sm': { max: '640px' },
      'md': { max: '768px' },
      'lg': { max: '1024px' },
      'xl': { max: '1440px' },
      '2xl': { max: '1920px' },
      'smMinH': { 'raw': '(max-height: 800px)' },
    },
    fontSize: {
      'sm': '0.75', //12px
      'md': '0.875', //14px
      'base': '1rem', //16px
      'lg': '1.125rem ', //18px
      'xl': '1.25rem', //20px
      '2xl': '1.5rem', //24px
      '3xl': '2rem', //32px
      '4xl' : '2.5rem', //40px
      '5xl': '3rem', //48px
      '6xl': '4rem' //64px
    },
    extend: {
      width: {
        '25%': '25%',
        '85%': '85%',
        '90%': '90%',
        '95%': '95%',
        '128': '32rem',
        '132': '40rem'
      },
      height: {
        '1px' : '1px',
      },
      minHeight: {
        'sm' : '600px',
        'md' : '716px'
      },
      fontFamily: {
        'roboto': ['Roboto']
      },
      colors: {
       'firstColor': '#0EA5E9',
       'firstBg': '#20233C',
       'secondBg': '#383B50',
       'errorsColor': '#D83A52',
       'grayColor:': '#C5C7D0',
       'placeHolderColor': '#9CA3AF',
       'blackOpacity': 'rgba(0, 0, 0,.8)',
       'alertColor': '#EE9B00'
      }
    }
  },
  plugins: []
}
