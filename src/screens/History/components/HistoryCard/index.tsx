import { HStack, VStack, Heading, Text } from "native-base"

export const HistoryCard: React.FC = () => {
  return (
    <HStack
      bg="gray.600"
      mb={3}
      w="full"
      px={5}
      py={4}
      rounded="md"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack
        flex={1}
        mr="5"
      >
        <Heading
          color="white"
          fontSize="md"
          textTransform="capitalize"
          numberOfLines={1}
        >
          Costas
        </Heading>

        <Text
          color="gray.100"
          fontSize="lg"
          numberOfLines={1}
        >
          Puxada Frontal
        </Text>
      </VStack>

      <Text
        color="gray.300"
        fontSize="md"
      >
        08:56
      </Text>
    </HStack>
  )
}
