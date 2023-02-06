import { useState } from "react"

import { TouchableOpacity } from "react-native"

import {
  VStack,
  ScrollView,
  Center,
  Skeleton,
  Text,
  Heading,
} from "native-base"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

const PHOTO_SIZE = 33

export const Profile: React.FC = () => {
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView>
        <Center
          mt={6}
          mb={6}
          px={10}
        >
          {photoIsLoading ? (
            <Skeleton
              w={PHOTO_SIZE}
              h={PHOTO_SIZE}
              rounded="full"
              startColor="gray.500"
              endColor="gray.600"
            />
          ) : (
            <UserPhoto
              source={{ uri: "https://github.com/cesarmsimionato.png" }}
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity>
            <Text
              mt={2}
              mb={8}
              color="green.500"
              fontSize="md"
              fontWeight="bold"
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input
            bg="gray.600"
            placeholder="Nome"
          />

          <Input
            bg="gray.600"
            isDisabled
            placeholder="E-mail"
            value="cesar.medeiros.simionato@gmail.com"
          />

          <Heading
            mt={8}
            mb={2}
            alignSelf="flex-start"
            color="gray.200"
            fontSize="md"
          >
            Alterar senha
          </Heading>

          <Input
            bg="gray.600"
            secureTextEntry
            placeholder="Senha antiga"
          />

          <Input
            bg="gray.600"
            secureTextEntry
            placeholder="Nova senha"
          />

          <Input
            bg="gray.600"
            secureTextEntry
            placeholder="Confirme a nova senha"
          />

          <Button
            mt={4}
            title="Atualizar"
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
