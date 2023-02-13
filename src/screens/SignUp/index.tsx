import { ScrollView, VStack, Image, Center, Text, Heading } from "native-base"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorProps } from "@routes/auth.routes"

import BackgroundImg from "@assets/background.png"

import LogoSvg from "@assets/logo.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

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
  const navigation = useNavigation<AuthNavigatorProps>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const handleGoBack = () => {
    navigation.goBack()
  }

  const handleSignUp = (data: FormData) => {
    console.log(data)
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        px={10}
        pb={16}
      >
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
        />

        <Center my={24}>
          <LogoSvg />

          <Text
            color="gray.100"
            fontSize="sm"
          >
            Treine sua mente e seu corpo
          </Text>
        </Center>

        <Center>
          <Heading
            mb="6"
            color="gray.100"
            fontSize="xl"
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
            title="Criar e acessar"
            onPress={handleSubmit(handleSignUp)}
          />
        </Center>

        <Button
          mt={12}
          title="Voltar para o login"
          variant="outline"
          onPress={handleGoBack}
        />
      </VStack>
    </ScrollView>
  )
}
