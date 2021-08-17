import React from 'react'
import { ListProvider } from './list'
import { ModalConfigProvider } from './modalConfig'

import { ThemeProvider } from './theme'

const AppProvider: React.FC = ({ children }: any) => (
  <ThemeProvider>
    <ModalConfigProvider>
      <ListProvider>{children}</ListProvider>
    </ModalConfigProvider>
  </ThemeProvider>
)

export default AppProvider
