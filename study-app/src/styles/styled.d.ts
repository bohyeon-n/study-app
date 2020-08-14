import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    bgColors: {
      main: string
      point: string
      sub: string
      hover: string
      alert: string
      allow: string
    }
    borderColors: {
      main: string
      dark: string
    }
    fontColors: {
      main: string
      main_light: string
      sub: string
      sub_dark: string
      point: string
      white: string
      alert: string
      allow: string
    }
  }

  export interface DefaultWidth {
    container: number
  }
}
