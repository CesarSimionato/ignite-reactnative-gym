import { useState } from "react"

import { VStack, FlatList, HStack, Heading, Text } from "native-base"

import { HomeHeader } from "@components/HomeHeader"
import { Group } from "@components/Group"
import { ExerciseCard } from "@components/ExerciseCard"

export const Home: React.FC = () => {
  const [groups, setGroups] = useState(["costas", "bíceps", "tríceps", "ombro"])
  const [groupSelected, setGroupSelected] = useState("costas")

  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Remada curvada",
    "Remada unilateral",
    "Levantamento terra",
  ])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        maxH={10}
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
          renderItem={({ item }) => <ExerciseCard />}
        />
      </VStack>
    </VStack>
  )
}
