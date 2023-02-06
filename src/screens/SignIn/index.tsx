import { ScrollView, VStack, Image, Center, Text, Heading } from "native-base"

import { useNavigation } from "@react-navigation/native"
import { AuthNavigatorProps } from "@routes/auth.routes"

import BackgroundImg from "@assets/background.png"

import LogoSvg from "@assets/logo.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

export const SignIn: React.FC = () => {
  const navigation = useNavigation<AuthNavigatorProps>()

  const handleNewAccount = () => {
    navigation.navigate("signUp")
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
            Acesse sua conta
          </Heading>

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Senha"
            secureTextEntry
          />

          <Button title="Acessar" />
        </Center>

        <Center mt={24}>
          <Text
            mb={3}
            color="gray.100"
            fontSize="sm"
            fontFamily="body"
          >
            Ainda não tem acesso?
          </Text>
        </Center>

        <Button
          title="Criar conta"
          variant="outline"
          onPress={handleNewAccount}
        />
      </VStack>
    </ScrollView>
  )
}
