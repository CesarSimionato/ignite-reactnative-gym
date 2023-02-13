import { TouchableOpacity } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { AppNavigatorProps } from "@routes/app.routes"

import { VStack, Icon, HStack, Heading, Text } from "native-base"

import { Feather } from "@expo/vector-icons"

import BodySvg from "@assets/body.svg"

export const Header: React.FC = () => {
  const navigation = useNavigation<AppNavigatorProps>()

  const handleGoBack = () => {
    navigation.goBack()
  }

  return (
    <VStack
      pt={12}
      px={8}
      bg="gray.600"
    >
      <TouchableOpacity onPress={handleGoBack}>
        <Icon
          as={Feather}
          name="arrow-left"
          size={6}
          color="green.500"
        />
      </TouchableOpacity>

      <HStack
        mt={4}
        mb={8}
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading
          flexShrink={1}
          color="gray.100"
          fontSize="lg"
          fontFamily="heading"
        >
          Puxada frontal
        </Heading>

        <HStack alignItems="center">
          <BodySvg />

          <Text
            ml={1}
            color="gray.200"
            textTransform="capitalize"
          >
            Costas
          </Text>
        </HStack>
      </HStack>
    </VStack>
  )
}
