import { useState } from "react"

import { VStack, SectionList, Heading, Text } from "native-base"

import { ScreenHeader } from "@components/ScreenHeader"

import { HistoryCard } from "./components/HistoryCard"

export const History: React.FC = () => {
  const [exercises, setExercises] = useState([
    {
      title: "04.02.23",
      data: ["Puxada frontal", "Remada unilateral"],
    },
    {
      title: "05.02.23",
      data: ["Puxada frontal"],
    },
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      <SectionList
        px={8}
        showsVerticalScrollIndicator={false}
        sections={exercises}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            mt={10}
            mb={3}
            color="gray.200"
            fontSize="md"
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        ListEmptyComponent={() => (
          <Text
            color="gray.100"
            textAlign="center"
          >
            Não há exercícios registrados ainda
            {"\n"}
            Vamos fazer exercícios hoje?
          </Text>
        )}
        contentContainerStyle={
          exercises.length === 0 && { flex: 1, justifyContent: "center" }
        }
      />
    </VStack>
  )
}
