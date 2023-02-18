import { Input as NativeBaseInput, FormControl, IInputProps } from "native-base"

type Props = IInputProps & {
  errorMessage?: string
}

export const Input: React.FC<Props> = ({
  errorMessage,
  isInvalid,
  ...rest
}) => {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl
      isInvalid={invalid}
      mb={4}
    >
      <FormControl.ErrorMessage _text={{ color: "red.500" }}>
        {errorMessage}
      </FormControl.ErrorMessage>

      <NativeBaseInput
        h={14}
        px={4}
        bg="gray.700"
        borderColor="gray.700"
        color="white"
        fontSize="md"
        fontFamily="body"
        placeholderTextColor="gray.300"
        isInvalid={invalid}
        _invalid={{
          borderColor: "red.500",
        }}
        _focus={{
          bg: "gray.700",
          borderColor: "green.500",
        }}
        {...rest}
      />
    </FormControl>
  )
}
