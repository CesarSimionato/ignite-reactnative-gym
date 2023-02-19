import { useState } from "react"

import { useNavigation } from "@react-navigation/native"
import { AppNavigatorProps } from "@routes/app.routes"

import { FlatList, Heading, HStack, Text, VStack } from "native-base"

import { ExerciseCard } from "./components/ExerciseCard"
import { Group } from "./components/Group"
import { Header } from "./components/Header"

export const Home: React.FC = () => {
  const navigation = useNavigation<AppNavigatorProps>()

  const [groups, setGroups] = useState(["costas", "bíceps", "tríceps", "ombro"])
  const [groupSelected, setGroupSelected] = useState("costas")

  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ])

  const handleOpenExerciseDetails = () => {
    navigation.navigate("exercise")
  }

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
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ExerciseCard onPress={handleOpenExerciseDetails} />
          )}
        />
      </VStack>
    </VStack>
  )
}
