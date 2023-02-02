import { VStack, Image, Center, Text, Heading, ScrollView } from "native-base"

import BackgroundImg from "@assets/background.png"

import LogoSvg from "@assets/logo.svg"

import { Input } from "@components/Input"
import { Button } from "@components/Button"

export const SignUp: React.FC = () => {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack
        flex={1}
        px={10}
        pb={16}
        bg="gray.700"
      >
        <Image
          source={BackgroundImg}
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

          <Input placeholder="Nome" />

          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            placeholder="Senha"
            secureTextEntry
          />

          <Button title="Criar e acessar" />
        </Center>

        <Button
          mt={24}
          title="Voltar para o login"
          variant="outline"
        />
      </VStack>
    </ScrollView>
  )
}
