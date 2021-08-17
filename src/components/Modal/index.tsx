import React, { useContext } from 'react'
import { Observer } from 'mobx-react'
import { ThemeContext } from 'styled-components'
import { Modal as ModalRN, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import ToggleTheme from '../ToggleTheme'

import { useModalConfig } from '../../hooks/modalConfig'

import {
  Container,
  ModalStyled,
  Main,
  Header,
  Config,
  Title,
  TitleConfig,
} from './styles'

function Modal() {
  const { colors } = useContext(ThemeContext)

  const { modalConfigStore } = useModalConfig()

  const handleCloseModal = () => {
    modalConfigStore.changeVisiable(false)
  }

  return (
    <Observer>
      {() => (
        <ModalRN
          animationType="fade"
          visible={modalConfigStore.visiable}
          transparent
        >
          <Container>
            <ModalStyled>
              <Header>
                <Title
                  style={{
                    color: colors.main,
                  }}
                >
                  Configurações
                </Title>

                <TouchableOpacity onPress={handleCloseModal}>
                  <Icon name="close" color="black" size={40} />
                </TouchableOpacity>
              </Header>
              <Main>
                <Config>
                  <TitleConfig>Alterar Tema</TitleConfig>
                  <ToggleTheme />
                </Config>
              </Main>
            </ModalStyled>
          </Container>
        </ModalRN>
      )}
    </Observer>
  )
}

export default Modal
