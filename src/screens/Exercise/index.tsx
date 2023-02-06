import { Image, VStack, Box, HStack, Text } from "native-base"

import { Header } from "./components/Header"

import { Button } from "@components/Button"

import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"

export const Exercise: React.FC = () => {
  return (
    <VStack flex={1}>
      <Header />

      <VStack p={8}>
        <Image
          mb={3}
          w="full"
          h={80}
          resizeMode="cover"
          rounded="lg"
          source={{
            uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
          }}
          alt="Nome do exercício"
        />

        <Box
          pb={4}
          px={4}
          bg="gray.600"
          rounded="md"
        >
          <HStack
            mt={5}
            mb={6}
            alignItems="center"
            justifyContent="space-around"
          >
            <HStack>
              <SeriesSvg />

              <Text
                ml={2}
                color="gray.200"
              >
                3 séries
              </Text>
            </HStack>

            <HStack>
              <RepetitionsSvg />

              <Text
                ml={2}
                color="gray.200"
              >
                12 repetições
              </Text>
            </HStack>
          </HStack>

          <Button title="Marcar como realizado" />
        </Box>
      </VStack>
    </VStack>
  )
}
