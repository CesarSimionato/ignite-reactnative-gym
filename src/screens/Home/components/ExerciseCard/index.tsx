import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { HStack, Image, VStack, Heading, Text, Icon } from "native-base"

import { Entypo } from "@expo/vector-icons"

type Props = TouchableOpacityProps & {}

export const ExerciseCard: React.FC<Props> = ({ ...rest }) => {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        mb={3}
        bg="gray.500"
        alignItems="center"
        p={2}
        pr={4}
        rounded="md"
      >
        <Image
          mr={4}
          w={16}
          h={16}
          rounded="md"
          resizeMode="cover"
          source={{
            uri: "http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
          }}
          alt="Imagem do exercício"
        />

        <VStack flex={1}>
          <Heading
            color="white"
            fontSize="lg"
            fontFamily="heading"
          >
            Remada unilateral
          </Heading>
          <Text
            mt={1}
            color="gray.200"
            fontSize="sm"
            numberOfLines={2}
          >
            3 séries x 12 repetições
          </Text>
        </VStack>

        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
        />
      </HStack>
    </TouchableOpacity>
  )
}
