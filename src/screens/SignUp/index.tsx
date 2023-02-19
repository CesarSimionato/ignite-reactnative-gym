import { useState } from "react"

import {
  ScrollView,
  VStack,
  Image,
  Center,
  Text,
  Heading,
  useToast,
} from "native-base"

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"

import { useAuth } from "@hooks/useAuth"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorProps } from "@routes/auth.routes"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

import BackgroundImg from "@assets/background.png"
import LogoSvg from "@assets/logo.svg"

const schema = yup.object({
  name: yup.string().required("Informe o nome"),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup
    .string()
    .required("Informe a senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
  password_confirm: yup
    .string()
    .required("Confirme a senha")
    .oneOf([yup.ref("password")], "A confirmação da senha não confere"),
})

type FormData = yup.InferType<typeof schema>

export const SignUp: React.FC = () => {
  const toast = useToast()
  const { signIn } = useAuth()
  const navigation = useNavigation<AuthNavigatorProps>()

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const handleSignUp = async ({ name, email, password }: FormData) => {
    try {
      setIsLoading(true)

      await api.post("/users", {
        name,
        email,
        password,
      })

      await signIn(email, password)
    } catch (error) {
      setIsLoading(false)

      const isAppError = error instanceof AppError
      const message = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde"

      return toast.show({
        description: message,
        placement: "bottom",
        bgColor: "red.500",
        mb: 8,
      })
    }
  }

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <VStack
          flex={1}
          justifyContent="space-between"
          pt={24}
          pb={10}
          px={10}
        >
          <Center>
            <LogoSvg />

            <Text
              color="gray.100"
              fontSize="sm"
            >
              Treine sua mente e seu corpo
            </Text>
          </Center>

          <Center mt={8}>
            <Heading
              mb={8}
              color="gray.100"
              fontSize="xl"
              fontFamily="heading"
            >
              Crie sua conta
            </Heading>

            <Controller
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  errorMessage={errors.name?.message}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  errorMessage={errors.email?.message}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  errorMessage={errors.password?.message}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />

            <Controller
              name="password_confirm"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Confirme a senha"
                  secureTextEntry
                  returnKeyType="send"
                  errorMessage={errors.password_confirm?.message}
                  value={value}
                  onChangeText={onChange}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                />
              )}
            />

            <Button
              isLoading={isLoading}
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <VStack mt={8}>
            <Center>
              <Text
                color="gray.100"
                fontSize="sm"
                fontFamily="body"
              >
                Já tem acesso?
              </Text>
            </Center>

            <Button
              mt={4}
              title="Voltar para o login"
              variant="outline"
              onPress={handleGoBack}
            />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
