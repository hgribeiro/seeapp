import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { Appearance } from 'react-native'
import { ThemeProvider as StyledProvider } from 'styled-components'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'

interface ThemeContextData {
  ConfigButton(): void
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

const ThemeProvider: React.FC = ({ children }) => {
  const deviceTheme = Appearance.getColorScheme()
  const [theme, setTheme] = useState(deviceTheme === 'light' ? light : dark)

  useEffect(() => {
    async function getPersistedTheme(): Promise<void> {
      const storegedTheme = await AsyncStorage.getItem('theme')

      if (storegedTheme) {
        setTheme(storegedTheme === 'light' ? light : dark)
      }
    }

    getPersistedTheme()
  }, [])

  const storageTheme = useCallback(async themeToPersist => {
    setTheme(themeToPersist === 'light' ? light : dark)
    await AsyncStorage.setItem('theme', themeToPersist)
  }, [])

  useEffect(() => {
    storageTheme(deviceTheme)
  }, [deviceTheme, storageTheme])

  const ConfigButton = useCallback(() => {
    storageTheme(theme.title === 'light' ? 'dark' : 'light')
  }, [theme.title, storageTheme])

  return (
    <StyledProvider theme={theme}>
      <ThemeContext.Provider value={{ ConfigButton }}>
        {children}
      </ThemeContext.Provider>
    </StyledProvider>
  )
}

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { ThemeProvider, useTheme }
