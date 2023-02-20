import { useState, useEffect, useCallback } from "react"

import { useNavigation, useFocusEffect } from "@react-navigation/native"
import { AppNavigatorProps } from "@routes/app.routes"

import { FlatList, Heading, HStack, Text, VStack, useToast } from "native-base"

import { ExerciseDTO } from "@dtos/ExerciseDTO"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { Header } from "./components/Header"
import { Group } from "./components/Group"

import { ExercisesSkeleton } from "./components/ExercisesSkeleton"
import { ExerciseCard } from "./components/ExerciseCard"

export const Home: React.FC = () => {
  const toast = useToast()
  const navigation = useNavigation<AppNavigatorProps>()

  const [isLoading, setIsLoading] = useState(true)

  const [groups, setGroups] = useState<string[]>([])
  const [groupSelected, setGroupSelected] = useState("antebraço")

  const [exercises, setExercises] = useState<ExerciseDTO[]>([])

  const handleOpenExerciseDetails = (exerciseId: string) => {
    navigation.navigate("exercise", { exerciseId })
  }

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const { data } = await api.get("/groups")
        setGroups(data)
      } catch (error) {
        const isAppError = error instanceof AppError
        const message = isAppError
          ? error.message
          : "Não foi possível carregar os grupos musculares"

        return toast.show({
          description: message,
          placement: "top",
          bgColor: "red.500",
        })
      }
    }
    fetchGroups()
  }, [toast])

  useFocusEffect(
    useCallback(() => {
      const fetchExercisesByGroup = async () => {
        try {
          setIsLoading(true)
          const response = await api.get(`/exercises/bygroup/${groupSelected}`)
          setExercises(response.data)
        } catch (error) {
          const isAppError = error instanceof AppError
          const message = isAppError
            ? error.message
            : "Não foi possível carregar os exercícios"

          return toast.show({
            description: message,
            placement: "top",
            bgColor: "red.500",
          })
        } finally {
          setIsLoading(false)
        }
      }
      fetchExercisesByGroup()
    }, [groupSelected, toast]),
  )

  return (
    <VStack flex={1}>
      <Header />

      <FlatList
        maxH={10}
        minH={10}
        my={10}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={
              groupSelected.toLocaleLowerCase() === item.toLocaleLowerCase()
            }
            onPress={() => setGroupSelected(item)}
          />
        )}
      />

      {isLoading ? (
        <ExercisesSkeleton />
      ) : (
        <VStack
          flex={1}
          px={8}
        >
          <HStack
            mb={5}
            justifyContent="space-between"
          >
            <Heading
              color="gray.200"
              fontSize="md"
              fontFamily="heading"
            >
              Exercícios
            </Heading>

            <Text
              color="gray.200"
              fontSize="sm"
            >
              {exercises.length}
            </Text>
          </HStack>

          <FlatList
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 20 }}
            data={exercises}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <ExerciseCard
                data={item}
                onPress={() => handleOpenExerciseDetails(item.id)}
              />
            )}
          />
        </VStack>
      )}
    </VStack>
  )
}
