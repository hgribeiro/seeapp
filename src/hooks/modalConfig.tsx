import React, { createContext, useContext } from 'react'
import { useLocalObservable } from 'mobx-react'
import { changeModalVisibleStore } from '../storage/modalConfigStore'

interface modalConfigStore {
  visiable: boolean
  changeVisiable: (isVisiable: boolean) => void
}
interface ModalConfigContextData {
  modalConfigStore: modalConfigStore
}

const ModalConfigContext = createContext<ModalConfigContextData>(
  {} as ModalConfigContextData,
)

const ModalConfigProvider: React.FC = ({ children }) => {
  const modalConfigStore = useLocalObservable(changeModalVisibleStore)

  return (
    <ModalConfigContext.Provider value={{ modalConfigStore }}>
      {children}
    </ModalConfigContext.Provider>
  )
}

function useModalConfig(): ModalConfigContextData {
  const context = useContext(ModalConfigContext)

  if (!context) {
    throw new Error('useModalConfig must be used within an ModalConfigProvider')
  }

  return context
}

export { ModalConfigProvider, useModalConfig }
