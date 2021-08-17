import React, {
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useContext,
} from 'react'
import { TextInputProps, TouchableOpacity } from 'react-native'
import { useField } from '@unform/core'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Container, TextInput } from './styles'
import { ThemeContext } from 'styled-components'

interface InputProps extends TextInputProps {
  name: string
  icon: string
  containerStyle?: {}
  onSubmitEditing: () => void
}

interface InputValueReference {
  value: string
}

interface InputRef {
  focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, onSubmitEditing, ...rest }: InputProps,
  ref,
) => {
  const { colors } = useContext(ThemeContext)

  const inputElementRef = useRef<any>(null)

  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputValueRef.current.value)
  }, [])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    },
  }))

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [fieldName, registerField])

  return (
    <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value
        }}
        onSubmitEditing={onSubmitEditing}
        {...rest}
      />
      <TouchableOpacity onPress={onSubmitEditing}>
        <Icon
          name="search"
          size={20}
          color={
            isFocused || isFilled
              ? colors.inputIconFill
              : colors.inputIconNotFill
          }
        />
      </TouchableOpacity>
    </Container>
  )
}

export default forwardRef(Input)
