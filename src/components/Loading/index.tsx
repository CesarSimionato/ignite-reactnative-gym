import { Spinner, Center } from "native-base"

export const Loading: React.FC = () => {
  return (
    <Center
      flex={1}
      bg="gray.700"
    >
      <Spinner
        size="lg"
        color="green.500"
      />
    </Center>
  )
}
