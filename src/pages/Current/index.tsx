import React, { useContext, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  ActivityContainer,
  Container,
  Footer,
  Header,
  HeaderLocation,
  Main,
  Temperature,
  TemperatureText,
  Text,
  Image,
  ImageView,
  ReloadButton,
} from './styles'

import Geolocation from 'react-native-geolocation-service'

import appConfig from '../../../app.json'
import api from '../../services/api'
import { transformToUpperCase } from '../../utils/transformToUpperCase'

import ConfigButton from '../../components/ConfigButton'
import { ThemeContext } from 'styled-components'
import { cityData } from '../../types/CityData'

import { API_KEY } from '@env'

function Current() {
  const [location, setLocation] = useState<Geolocation.GeoPosition | null>(null)
  const [cityData, setcityData] = useState<null | cityData>(null)
  const [loadingData, setLoadingData] = useState(false)

  const { colors } = useContext(ThemeContext)

  useEffect(() => {
    if (hasLocationPermission()) {
      getLocation()
    }
  }, [])

  useEffect(() => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      LoadcityData()
    }
  }, [location])

  async function LoadcityData() {
    setLoadingData(true)
    try {
      const { data } = await api.get(
        `weather?lat=${location?.coords?.latitude}&lon=${location?.coords?.longitude}&appid=${API_KEY}&units=metric&lang=pt_br`,
      )
      setcityData(data)
    } catch (error) {
      Alert.alert(
        'Erro de conexão',
        'Verifique sua conexão com a internet e tente novamente',
      )
    }

    setLoadingData(false)
  }

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings')
      })
    }

    const status = await Geolocation.requestAuthorization('whenInUse')

    if (status === 'granted') {
      return true
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied')
    }

    if (status === 'disabled') {
      Alert.alert(
        `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
        '',
        [
          { text: 'Go to Settings', onPress: openSetting },
          { text: "Don't Use Location", onPress: () => {} },
        ],
      )
    }

    return false
  }

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS()
      return hasPermission
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    if (hasPermission) {
      return true
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    )

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      )
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      )
    }

    return false
  }

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission()

    if (!hasPermission) {
      return
    }

    Geolocation.getCurrentPosition(
      position => {
        setLocation(position)
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message)
        setLocation(null)
        console.log(error, 'error')
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        timeout: 36000,
        maximumAge: 20000,
        distanceFilter: 0,
      },
    )
  }

  return (
    <Container>
      <Header>
        <ReloadButton onPress={() => getLocation()}>
          <Icon name="reload-circle" size={60} color={colors.main} />
        </ReloadButton>
        <ConfigButton />
      </Header>

      {!loadingData ? (
        <Main>
          <Temperature>
            {cityData?.main.temp && cityData?.weather[0].description && (
              <>
                <ImageView>
                  {cityData?.weather[0].icon && (
                    <Image
                      source={{
                        uri: `http://openweathermap.org/img/wn/${cityData?.weather[0].icon}@2x.png`,
                      }}
                    />
                  )}
                </ImageView>
                {!loadingData && cityData && (
                  <View style={{ flexDirection: 'row' }}>
                    <HeaderLocation style={{ fontWeight: 'bold' }}>
                      {cityData.name},
                    </HeaderLocation>
                    <HeaderLocation
                      style={{ color: colors.text, fontWeight: 'bold' }}
                    >
                      {` ${cityData.sys.country}`}
                    </HeaderLocation>
                  </View>
                )}
                <Text>
                  {transformToUpperCase(cityData?.weather[0].description)}
                </Text>
                <TemperatureText>
                  {cityData?.main.temp.toFixed(0)}
                  <TemperatureText style={{ color: colors.main }}>
                    º
                  </TemperatureText>
                </TemperatureText>
              </>
            )}
          </Temperature>

          <Footer>
            {cityData?.main && (
              <>
                <Text>
                  Min: {cityData?.main.temp_min.toFixed(0)}
                  <Text style={{ color: colors.main }}>º</Text>
                </Text>
                <Text>
                  Max: {cityData?.main.temp_max.toFixed(0)}
                  <Text style={{ color: colors.main }}>º</Text>
                </Text>
              </>
            )}
          </Footer>
        </Main>
      ) : (
        <ActivityContainer>
          <ActivityIndicator size="large" color={colors.text} />
        </ActivityContainer>
      )}
    </Container>
  )
}

export default Current
