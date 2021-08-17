import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  height: 100%;
  width: 100%;

  justify-content: center;
  align-items: center;
`

export const ModalStyled = styled.View`
  width: 320px;
  height: 360px;
  background-color: ${props => props.theme.colors.inputBackground};
  border-radius: 16px;
  padding: 16px;
`
export const Header = styled.View`
  height: 20%;
  padding: 4px;

  flex-direction: row;

  justify-content: space-between;
`

export const Main = styled.View`
  height: 80%;
  width: 100%;

  justify-content: center;
  align-items: center;
`

export const Config = styled.View`
  flex-direction: row;

  width: 100%;
  padding: 32px;

  justify-content: space-between;

  border: 1px solid black;
  border-radius: 16px;
`

export const Title = styled.Text`
  font-size: 26px;

  margin-right: 32px;
`

export const TitleConfig = styled.Text`
  font-size: 24px;

  color: ${props => props.theme.colors.text};

  margin-right: 32px;
`
