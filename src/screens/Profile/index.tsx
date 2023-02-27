/* eslint-disable camelcase */
import { useState } from "react"

import {
  VStack,
  ScrollView,
  Center,
  Skeleton,
  Text,
  Heading,
  useToast,
} from "native-base"

import * as ImagePicker from "expo-image-picker"

import * as FileSystem from "expo-file-system"

import { TouchableOpacity } from "react-native"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"

import { useAuth } from "@hooks/useAuth"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { ScreenHeader } from "@components/ScreenHeader"
import { UserPhoto } from "@components/UserPhoto"
import { Input } from "@components/Input"
import { Button } from "@components/Button"

import defaultUserPhotoImg from "@assets/userPhotoDefault.png"

const schema = yup.object({
  name: yup.string().required("Informe o nome"),
  old_password: yup.string(),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .nullable()
    .transform((value) => value || null),
  password_confirm: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .oneOf([yup.ref("password")], "A confirmação da senha não confere")
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) =>
        schema
          .nullable()
          .required("Confirme a nova senha")
          .transform((value) => value || null),
    }),
})

type FormData = yup.InferType<typeof schema>

const PHOTO_SIZE = 33
const MAX_UPLOAD_PHOTO_SIZE = 3 // MB

export const Profile: React.FC = () => {
  const toast = useToast()

  const { user, updateUserProfile } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
    },
  })

  const [isUpdating, setIsUpdating] = useState(false)

  const [photoIsLoading, setPhotoIsLoading] = useState(false)

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
              placement: "top",
              bgColor: "red.500",
            })
          }

          console.log(photoSelected.assets[0].type)

          const fileExtension = photoSelected.assets[0].uri.split(".").pop()

          const photoFile = {
            name: `${user.name}.${fileExtension}`.toLocaleLowerCase(),
            uri: photoSelected.assets[0].uri,
            type: `${photoSelected.assets[0].type}/${fileExtension}`,
          } as any

          const userPhotoUploadForm = new FormData()
          userPhotoUploadForm.append("avatar", photoFile)

          const { data } = await api.patch(
            "/users/avatar",
            userPhotoUploadForm,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          )

          const avatar = data.avatar

          await updateUserProfile({ ...user, avatar })

          return toast.show({
            description: "Foto atualizada!",
            placement: "top",
            bgColor: "green.500",
          })
        }
      }
    } catch (error) {
    } finally {
      setPhotoIsLoading(false)
    }
  }

  const handleProfileUpdate = async ({
    name,
    password,
    old_password,
  }: FormData) => {
    try {
      setIsUpdating(true)

      await api.put("/users", {
        name,
        password,
        old_password,
      })

      await updateUserProfile({ ...user, name })

      return toast.show({
        description: "Perfil atualizado com sucesso",
        placement: "top",
        bgColor: "green.500",
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : "Não foi possível alterar os dados. Tente novamente mais tarde"

      return toast.show({
        description: message,
        placement: "top",
        bgColor: "red.500",
      })
    } finally {
      setIsUpdating(false)
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultUserPhotoImg
              }
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

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nome"
                errorMessage={errors.name?.message}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Input
            bg="gray.600"
            isDisabled
            placeholder="E-mail"
            value={user.email}
          />

          <Heading
            mt={8}
            mb={2}
            alignSelf="flex-start"
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
          >
            Alterar senha
          </Heading>

          <Controller
            name="old_password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Senha atual"
                secureTextEntry
                errorMessage={errors.old_password?.message}
                value={value}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Nova senha"
                secureTextEntry
                errorMessage={errors.password?.message}
                onChangeText={onChange}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { onChange } }) => (
              <Input
                bg="gray.600"
                placeholder="Confirme a nova senha"
                secureTextEntry
                errorMessage={errors.password_confirm?.message as string}
                onChangeText={onChange}
              />
            )}
          />

          <Button
            mt={4}
            title="Atualizar"
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>
      </ScrollView>
    </VStack>
  )
}
