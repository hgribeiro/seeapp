import React, { useContext, useState } from 'react'
import { Switch } from 'react-native'
import { ThemeContext } from 'styled-components'

import { useTheme } from '../../hooks/theme'

import { Container, Button } from './styles'

const ToggleTheme: React.FC = () => {
  const { colors } = useContext(ThemeContext)

  const { ConfigButton } = useTheme()
  const [isEnabled, setIsEnabled] = useState(false)

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState)
    ConfigButton()
  }
  return (
    <Container>
      <Switch
        trackColor={{ false: '#767577', true: '#000000' }}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      {/* <Button onPress={ConfigButton}></Button> */}
    </Container>
  )
}

export default ToggleTheme
