import { DefaultTheme, DefaultWidth } from 'styled-components'

export const basicTheme: DefaultTheme = {
  bgColors: {
    main: '#F6F8FA',
    point: '#d49466',
    sub: 'navy',
    hover: '#F6F8FA',
    alert: '#d73a49',
    allow: '#0366d6'
  },
  fontColors: {
    main: '#111',
    main_light: '#333333',
    point: '#DB7092',
    sub: '#959595',
    white: '#fff',
    sub_dark: '#666666',
    alert: '#d73a49',
    allow: '#0366d6'
  },
  borderColors: {
    main: '#efefef',
    dark: '#d1d5da'
  }
}

export const defaultWidth: DefaultWidth = {
  container: 1200
}
