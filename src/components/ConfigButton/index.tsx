import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useModalConfig } from '../../hooks/modalConfig'

import Modal from '../Modal'

import { Container, Button } from './styles'

const ConfigButton = () => {
  // const [toggleModal, setToggleModal] = useState<boolean>(false)
  const { modalConfigStore } = useModalConfig()
  return (
    <Container>
      <Button
        onPress={() => {
          modalConfigStore.changeVisiable(true)
        }}
      >
        <Icon name="settings" color="black" size={35} />
      </Button>
      <Modal />

      {/* <Button
        onPress={() => {
          setToggleModal(prevState => !prevState)
        }}
      ></Button>
      <Modal isVisiable={toggleModal} /> */}
    </Container>
  )
}

export default ConfigButton
