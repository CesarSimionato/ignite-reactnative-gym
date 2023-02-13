import { TouchableOpacity } from "react-native"

import { HStack, VStack, Text, Heading, Icon } from "native-base"

import { MaterialIcons } from "@expo/vector-icons"

import { UserPhoto } from "@components/UserPhoto"

export const Header: React.FC = () => {
  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <UserPhoto
        source={{ uri: "https://github.com/cesarmsimionato.png" }}
        size={16}
        mr={4}
      />

      <VStack flex={1}>
        <Text
          color="gray.100"
          fontSize="md"
        >
          Olá,
        </Text>

        <Heading
          color="gray.100"
          fontSize="md"
          fontFamily="heading"
        >
          Cesar
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon
          as={MaterialIcons}
          name="logout"
          color="gray.200"
          size={7}
        />
      </TouchableOpacity>
    </HStack>
  )
}
