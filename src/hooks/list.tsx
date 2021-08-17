import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { cityData, WeatherHistoryDate } from '../types/cityData'

export type List = {
  cities: WeatherHistoryDate[]
}

interface ListContextData {
  addItem: (item: cityData) => void
  list: List | null
}

const ListContext = createContext<ListContextData>({} as ListContextData)

const ListProvider: React.FC = ({ children }) => {
  const [list, setList] = useState<List>({ cities: [] } as List)

  async function loadListStorageData() {
    const storageData = await AsyncStorage.getItem('@list_cities')
    if (storageData) {
      const ListLoaded = JSON.parse(storageData) as List
      setList(ListLoaded)
    }
    return {} as List
  }

  // PODERIA TER UM USEEFFECT PARA SETAR AS INFORMAÇÕES NO LOCALSTORAGE
  // SEMQUE O ESTADO FOSSE ALTERADO, JÁ QUE A MAIORIA
  // DAS FUNÇÕES ALTERA O LOCAL STORAGE

  useEffect(() => {
    loadListStorageData()
  }, [])

  const addItem = useCallback(
    async (item: cityData): Promise<void> => {
      try {
        const newList = { ...list }
        const dataNow = new Date()

        const ItemWithDataTimeAdded = { ...item, date: dataNow }
        console.log(ItemWithDataTimeAdded)
        newList.cities.push(ItemWithDataTimeAdded)

        await AsyncStorage.setItem('@list_cities', JSON.stringify(newList))

        setList(newList)
      } catch (e) {
        console.log('Erro ao inserir o item no histórico', e)
      }
    },
    [list],
  )

  return (
    <ListContext.Provider value={{ list, addItem }}>
      {children}
    </ListContext.Provider>
  )
}

function useList(): ListContextData {
  const context = useContext(ListContext)

  if (!context) {
    throw new Error('useList must be used within an ListProvider')
  }

  return context
}

export { ListProvider, useList }
