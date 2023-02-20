import { useState, useEffect } from "react"

import {
  Image,
  VStack,
  Box,
  HStack,
  Text,
  ScrollView,
  useToast,
} from "native-base"

import { RouteProp, useRoute } from "@react-navigation/native"

import { ExerciseDTO } from "@dtos/ExerciseDTO"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { Header } from "./components/Header"

import { Button } from "@components/Button"

import SeriesSvg from "@assets/series.svg"
import RepetitionsSvg from "@assets/repetitions.svg"
import { AppScreens } from "@routes/app.routes"
import { Skeleton } from "@components/Skeleton"

export const Exercise: React.FC = () => {
  const {
    params: { exerciseId },
  } = useRoute<RouteProp<AppScreens, "exercise">>()

  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)

  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)

  useEffect(() => {
    const fetchExerciseDetails = async () => {
      try {
        setIsLoading(true)
        const { data } = await api.get(`/exercises/${exerciseId}`)
        setExercise(data)
      } catch (error) {
        const isAppError = error instanceof AppError
        const message = isAppError
          ? error.message
          : "Não foi possível carregar os detalhes do exercício"

        return toast.show({
          description: message,
          placement: "top",
          bgColor: "red.500",
        })
      } finally {
        setIsLoading(false)
      }
    }
    fetchExerciseDetails()
  }, [exerciseId, toast])

  return (
    <VStack flex={1}>
      <Header
        name={exercise.name}
        group={exercise.group}
      />

      {isLoading ? (
        <VStack
          flex={1}
          p={8}
        >
          <Skeleton
            h={80}
            rounded="lg"
          />

          <Skeleton
            mt={3}
            h="141"
          />
        </VStack>
      ) : (
        <ScrollView>
          <VStack p={8}>
            <Box
              mb={3}
              overflow="hidden"
              rounded="lg"
            >
              <Image
                w="full"
                h={80}
                resizeMode="cover"
                source={{
                  uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}`,
                }}
                alt="Nome do exercício"
              />
            </Box>

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
                    {`${exercise.series} séries`}
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />

                  <Text
                    ml={2}
                    color="gray.200"
                  >
                    {`${exercise.repetitions} repetições`}
                  </Text>
                </HStack>
              </HStack>

              <Button title="Marcar como realizado" />
            </Box>
          </VStack>
        </ScrollView>
      )}
    </VStack>
  )
}
