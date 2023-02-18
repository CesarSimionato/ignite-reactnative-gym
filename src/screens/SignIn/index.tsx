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
