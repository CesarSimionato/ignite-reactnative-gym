/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useCallback } from "react"

import { VStack, SectionList, Heading, Text, useToast } from "native-base"

import { useFocusEffect } from "@react-navigation/native"

import { HistoryByDayDTO } from "@dtos/HistoryDTO"

import { api } from "@services/api"
import { AppError } from "@utils/AppError"

import { ScreenHeader } from "@components/ScreenHeader"

import { HistoryCard } from "./components/HistoryCard"
import { Loading } from "@components/Loading"

export const History: React.FC = () => {
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)

  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([])

  useFocusEffect(
    useCallback(() => {
      const fetchHistory = async () => {
        try {
          const { data } = await api.get("/history")
          setExercises(data)
        } catch (error) {
          const isAppError = error instanceof AppError
          const message = isAppError
            ? error.message
            : "Não foi possível carregar o histórico."

          return toast.show({
            description: message,
            placement: "top",
            bgColor: "red.500",
          })
        } finally {
          setIsLoading(false)
        }
      }
      fetchHistory()
    }, []),
  )

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de Exercícios" />

      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          px={8}
          showsVerticalScrollIndicator={false}
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color="gray.200"
              fontSize="md"
              mt={10}
              mb={3}
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
      )}
    </VStack>
  )
}
