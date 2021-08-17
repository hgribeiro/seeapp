import React from 'react'

import ConfigButton from '../../components/ConfigButton'

import Item from '../../components/Item'

import { Container, Header, Main, Text, FlatListStyled } from './styles'

import { useList } from '../../hooks/list'

function ListC() {
  const { list } = useList()

  return (
    <Container>
      <Header>
        <Text>Histórico de Cidades</Text>
        <ConfigButton />
      </Header>

      <Main>
        {list?.cities && (
          <FlatListStyled
            data={list.cities.reverse()}
            keyExtractor={item => `${item.date}`}
            renderItem={({ item }) => <Item weatherItemState={item} />}
          />
        )}
      </Main>
    </Container>
  )
}

export default ListC
