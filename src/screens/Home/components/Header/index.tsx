import { TouchableOpacity } from "react-native"

import { HStack, VStack, Text, Heading, Icon } from "native-base"

import { api } from "@services/api"

import { useAuth } from "@hooks/useAuth"

import { MaterialIcons } from "@expo/vector-icons"

import { UserPhoto } from "@components/UserPhoto"

import defaultUserPhotoImg from "@assets/userPhotoDefault.png"

export const Header: React.FC = () => {
  const { user, signOut } = useAuth()

  return (
    <HStack
      bg="gray.600"
      pt={16}
      pb={5}
      px={8}
      alignItems="center"
    >
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserPhotoImg
        }
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
          {user.name}
        </Heading>
      </VStack>

      <TouchableOpacity onPress={signOut}>
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
