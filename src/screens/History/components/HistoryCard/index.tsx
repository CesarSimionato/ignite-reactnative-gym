import { HStack, VStack, Heading, Text } from "native-base"

import { HistoryDTO } from "@dtos/HistoryDTO"

type Props = {
  data: HistoryDTO
}

export const HistoryCard: React.FC<Props> = ({
  data: { name, group, hour },
}) => {
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
          fontFamily="heading"
          textTransform="capitalize"
          numberOfLines={1}
        >
          {group}
        </Heading>

        <Text
          color="gray.100"
          fontSize="lg"
          numberOfLines={1}
        >
          {name}
        </Text>
      </VStack>

      <Text
        color="gray.300"
        fontSize="md"
      >
        {hour}
      </Text>
    </HStack>
  )
}
