import React, { useCallback, useContext, useRef, useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'

import { FormHandles } from '@unform/core'
import { Form } from '@unform/mobile'

import Input from '../../components/Input'
import ConfigButton from '../../components/ConfigButton'

import api from '../../services/api'
import * as Yup from 'yup'

import { cityData } from '../../types/CityData'

import { API_KEY } from '@env'

import {
  ActivityContainer,
  Container,
  Header,
  ImageView,
  Image,
  Main,
  Temperature,
  TemperatureText,
  Text,
  Content,
  Footer,
  TemperatureTextDegrees,
} from './styles'
import getValidationErrors from '../../utils/getValidationErrors'
import { ThemeContext } from 'styled-components'
import { transformToUpperCase } from '../../utils/transformToUpperCase'

import { useList } from '../../hooks/list'

interface SearchFormData {
  city: string
}

function Search() {
  const [cityData, setcityData] = useState<null | cityData>(null)
  const [loadingData, setLoadingData] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const { addItem } = useList()

  const { colors } = useContext(ThemeContext)

  const handleSearch = useCallback(async (data: SearchFormData, { reset }) => {
    try {
      setLoadingData(true)
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        city: Yup.string().required('Digite o nome de uma cidade'),
      })

      await schema.validate(data, {
        abortEarly: false,
      })
      const response = await api.get(
        `/weather?q=${data.city}&appid=${API_KEY}&units=metric&lang=pt_br`,
      )
      setcityData(response.data)
      addItem(response.data)
      setLoadingData(false)
      reset()
    } catch (err) {
      setLoadingData(false)
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)

        return
      }

      if (err.response?.data?.message === 'city not found') {
        formRef.current?.setErrors({
          city: 'Cidade não encontrada',
        })

        Alert.alert(
          'A Cidade não foi encontrada',
          'Essa Cidade não existe ou ainda não temos informações sobre ela.',
        )
        return
      }

      Alert.alert(
        'Erro na busca',
        'Ocorreu um erro ao buscar uma cidade, tente novamente',
      )
    }
  }, [])

  return (
    <Container>
      <Header>
        <Text>Buscar por cidade</Text>
        <ConfigButton />
      </Header>

      <Main>
        <Form ref={formRef} onSubmit={handleSearch}>
          <Input
            name="city"
            icon="search-location"
            placeholder="Type the City"
            onSubmitEditing={() => {
              formRef.current?.submitForm()
            }}
            containerStyle={{ marginTop: 20 }}
          />
        </Form>

        {!loadingData ? (
          <>
            {cityData?.main.temp && cityData?.weather[0].description && (
              <Content>
                <ImageView>
                  {cityData?.weather[0].icon && (
                    <Image
                      source={{
                        uri: `http://openweathermap.org/img/wn/${cityData?.weather[0].icon}@2x.png`,
                      }}
                    />
                  )}
                </ImageView>
                <Temperature>
                  <Text>
                    {cityData.name}, {cityData.sys.country}
                  </Text>
                  <Text>
                    {transformToUpperCase(cityData?.weather[0].description)}
                  </Text>
                  <Footer>
                    <TemperatureText>
                      {cityData?.main.temp.toFixed(0)}
                      <TemperatureTextDegrees>º</TemperatureTextDegrees>
                    </TemperatureText>
                  </Footer>
                </Temperature>
              </Content>
            )}
          </>
        ) : (
          <ActivityContainer>
            <ActivityIndicator size="large" color={colors.text} />
          </ActivityContainer>
        )}
      </Main>
    </Container>
  )
}

export default Search
