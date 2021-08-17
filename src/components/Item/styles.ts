import styled from 'styled-components/native'

export const Main = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.tabBarActiveBackgroundColor};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 200px;
  width: 95%;
  padding: 16px;
  margin: 8px;

  border-radius: 5px;
`
export const LeftBox = styled.View`
  justify-content: space-around;

  height: 100%;
  width: 50%;
  align-items: center;
`

export const CountryText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  margin: 4px 0px 4px 0;
  text-align: center;
  font-weight: bold;
`

export const FooterLeftSideBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 30%;
  width: 80%;
  align-items: center;
`
export const RightBox = styled.View`
  justify-content: space-between;
  height: 100%;
  width: 50%;
  align-items: flex-end;
`
export const FavoriteTougle = styled.View`
  margin-right: 48px;
  margin-bottom: 24px;
`

export const TextStyled = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: 16px;
  text-align: center;
  /* font-weight: bold; */
`

export const Temperature = styled.View`
  flex: 1;

  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const TemperatureText = styled.Text`
  color: ${props => props.theme.colors.text};
  margin-top: 8px;
  font-size: 64px;
  text-align: center;
  font-weight: bold;
`

export const ImageView = styled.View`
  width: 50%;
  height: 50%;
  align-items: center;
`

export const Image = styled.Image`
  width: 80px;
  height: 80px;
`

export const ReloadButton = styled.TouchableOpacity`
  margin-top: 20px;
`
