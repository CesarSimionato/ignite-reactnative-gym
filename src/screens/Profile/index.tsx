import { useState } from "react"

import * as ImagePicker from "expo-image-picker"

import * as FileSystem from "expo-file-system"

import { TouchableOpacity } from "react-native"

import {
  VStack,
  ScrollView,
  Center,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

const PHOTO_SIZE = 33
const MAX_UPLOAD_PHOTO_SIZE = 3 // MB

export const Profile: React.FC = () => {
  const toast = useToast()

  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState(
    "https://github.com/cesarmsimionato.png",
  )

  const handleUserPhotoSelect = async () => {
    try {
      setPhotoIsLoading(true)

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })

      if (!photoSelected.canceled) {
        if (photoSelected.assets[0].uri) {
          const photoInfo = await FileSystem.getInfoAsync(
            photoSelected.assets[0].uri,
          )

          if (
            photoInfo.size &&
            photoInfo.size / 1024 / 1024 > MAX_UPLOAD_PHOTO_SIZE
          ) {
            return toast.show({
              description: `Essa imagem é muito grande, Escolha uma até ${MAX_UPLOAD_PHOTO_SIZE}MB`,
              placement: "bottom",
              bgColor: "red.500",
              mb: 8,
            })
          }

          setUserPhoto(photoSelected.assets[0].uri)
        }
      }
    } catch (error) {
    } finally {
      setPhotoIsLoading(false)
    }
  }

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
              source={{ uri: userPhoto }}
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
              onPress={handleUserPhotoSelect}
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
