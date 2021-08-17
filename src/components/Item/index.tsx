import React, { useContext, useEffect, useState } from 'react'

import { Text } from 'react-native'
import { transformToUpperCase } from '../../utils/transformToUpperCase'
import { ThemeContext } from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
import { FormataStringData } from '../../utils/dateHourFormt'
import { WeatherHistoryDate } from '../../types/cityData'

import {
  Main,
  TemperatureText,
  Image,
  ImageView,
  LeftBox,
  RightBox,
  FooterLeftSideBox,
  CountryText,
  TextStyled,
  FavoriteTougle,
} from './styles'

interface Props {
  weatherItemState: WeatherHistoryDate | null
}

function Item({ weatherItemState }: Props) {
  const { colors } = useContext(ThemeContext)

  return (
    <Main>
      {weatherItemState?.main.temp &&
        weatherItemState?.main &&
        weatherItemState?.weather[0].description && (
          <>
            <LeftBox>
              <ImageView>
                {weatherItemState?.weather[0].icon && (
                  <Image
                    source={{
                      uri: `http://openweathermap.org/img/wn/${weatherItemState?.weather[0].icon}@2x.png`,
                    }}
                  />
                )}
              </ImageView>
              <CountryText style={{ color: colors.main }}>
                {`${weatherItemState?.name}, ${weatherItemState?.sys.country}`}
              </CountryText>
              <TextStyled style={{ color: colors.text }}>
                {transformToUpperCase(weatherItemState?.weather[0].description)}
              </TextStyled>

              <FooterLeftSideBox>
                <TextStyled style={{ color: colors.text }}>
                  Min: {weatherItemState?.main.temp_min.toFixed(0)}
                  <Text style={{ color: colors.main }}>º</Text>
                </TextStyled>
                <TextStyled style={{ color: colors.text }}>
                  Max: {weatherItemState?.main.temp_max.toFixed(0)}
                  <Text style={{ color: colors.main }}>º</Text>
                </TextStyled>
              </FooterLeftSideBox>
            </LeftBox>

            <RightBox>
              <TemperatureText>
                {weatherItemState?.main.temp.toFixed(0)}
                <TemperatureText style={{ color: colors.main }}>
                  º
                </TemperatureText>
              </TemperatureText>
            </RightBox>
          </>
        )}
    </Main>
  )
}

export default Item
