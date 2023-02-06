import { Image, IImageProps } from "native-base"

type Props = IImageProps & {
  size: number
}

export const UserPhoto: React.FC<Props> = ({ size, ...rest }) => {
  return (
    <Image
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor="gray.400"
      alt="Foto de Perfil"
      {...rest}
    />
  )
}
