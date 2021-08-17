import React, { useState } from 'react'
import { Switch } from 'react-native'

import { useTheme } from '../../hooks/theme'

import { Container } from './styles'

const ToggleTheme: React.FC = () => {
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
        thumbColor={isEnabled ? 'rgb(130, 87, 230)' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </Container>
  )
}

export default ToggleTheme
