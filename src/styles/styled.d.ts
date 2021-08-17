import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string

    colors: {
      main: string

      background: string

      switcherBackg: string
      text: string

      tabBarActiveBackgroundColor: string
      tabBarIconInactiveColor: string

      inputFocusBorderColor: string
      inputBackground: string
      inputTextColor: string
      inputIconFill: string
      inputIconNotFill: string
    }
  }
}
