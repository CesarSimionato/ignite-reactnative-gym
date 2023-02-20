import { TouchableOpacity, TouchableOpacityProps } from "react-native"

import { HStack, Image, VStack, Heading, Text, Icon, Box } from "native-base"

import { ExerciseDTO } from "@dtos/ExerciseDTO"

import { api } from "@services/api"

import { Entypo } from "@expo/vector-icons"

type Props = TouchableOpacityProps & {
  data: ExerciseDTO
}

export const ExerciseCard: React.FC<Props> = ({ data, ...rest }) => {
  return (
    <Box mb={3}>
      <TouchableOpacity {...rest}>
        <HStack
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
              uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`,
            }}
            alt="Imagem do exercício"
          />

          <VStack flex={1}>
            <Heading
              color="white"
              fontSize="lg"
              fontFamily="heading"
            >
              {data.name}
            </Heading>
            <Text
              mt={1}
              color="gray.200"
              fontSize="sm"
              numberOfLines={2}
            >
              {`${data.series} séries x ${data.repetitions} repetições`}
            </Text>
          </VStack>

          <Icon
            as={Entypo}
            name="chevron-thin-right"
            color="gray.300"
          />
        </HStack>
      </TouchableOpacity>
    </Box>
  )
}
