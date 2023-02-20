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

import { AppError } from "@utils/AppError"

import { useAuth } from "@hooks/useAuth"

import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorProps } from "@routes/auth.routes"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

import BackgroundImg from "@assets/background.png"
import LogoSvg from "@assets/logo.svg"

const schema = yup.object({
  email: yup.string().required("Informe o e-mail").email("E-mail inválido"),
  password: yup.string().required("Informe a senha"),
})

type FormData = yup.InferType<typeof schema>

export const SignIn: React.FC = () => {
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

  const handleSignIn = async ({ email, password }: FormData) => {
    try {
      setIsLoading(true)
      await signIn(email, password)
    } catch (error) {
      const isAppError = error instanceof AppError

      const message = isAppError
        ? error.message
        : "Não foi possível acessar. Tente novamente mais tarde"

      setIsLoading(false)

      return toast.show({
        description: message,
        placement: "top",
        bgColor: "red.500",
      })
    }
  }

  const handleNewAccount = () => {
    navigation.navigate("signUp")
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
              mb="8"
              color="gray.100"
              fontSize="xl"
              fontFamily="heading"
            >
              Acesse sua conta
            </Heading>

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

            <Button
              isLoading={isLoading}
              title="Acessar"
              onPress={handleSubmit(handleSignIn)}
            />
          </Center>

          <VStack mt={8}>
            <Center>
              <Text
                color="gray.100"
                fontSize="sm"
                fontFamily="body"
              >
                Ainda não tem acesso?
              </Text>
            </Center>

            <Button
              mt={4}
              title="Criar conta"
              variant="outline"
              onPress={handleNewAccount}
            />
          </VStack>
        </VStack>
      </VStack>
    </ScrollView>
  )
}
