import { HStack, VStack } from "native-base"

import { Skeleton } from "@components/Skeleton"

export const ExercisesSkeleton: React.FC = () => {
  return (
    <VStack
      flex={1}
      overflow="hidden"
      px={8}
      mb={8}
    >
      <HStack
        mb={5}
        justifyContent="space-between"
      >
        <Skeleton
          w={20}
          h={4}
        />

        <Skeleton
          w={4}
          h={4}
        />
      </HStack>

      <VStack>
        <Skeleton
          mb={3}
          h={20}
        />
        <Skeleton
          mb={3}
          h={20}
        />
        <Skeleton
          mb={3}
          h={20}
        />
        <Skeleton
          mb={3}
          h={20}
        />
        <Skeleton h={20} />
      </VStack>
    </VStack>
  )
}
