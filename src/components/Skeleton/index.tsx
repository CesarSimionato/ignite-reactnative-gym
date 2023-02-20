import { Skeleton as NativeBaseSkeleton, ISkeletonProps } from "native-base"

export const Skeleton: React.FC<ISkeletonProps> = ({ ...rest }) => {
  return (
    <NativeBaseSkeleton
      rounded="md"
      startColor="gray.500"
      endColor="gray.600"
      {...rest}
    />
  )
}
