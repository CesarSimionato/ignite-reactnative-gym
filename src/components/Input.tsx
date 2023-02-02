import { Input as NativeBaseInput, IInputProps } from "native-base"

export const Input: React.FC<IInputProps> = ({ ...rest }) => {
  return (
    <NativeBaseInput
      mb={4}
      h={14}
      px={4}
      bg="gray.700"
      borderColor="gray.700"
      color="white"
      fontSize="md"
      fontFamily="body"
      placeholderTextColor="gray.300"
      _focus={{
        bg: "gray.700",
        borderColor: "green.500",
      }}
      {...rest}
    />
  )
}
