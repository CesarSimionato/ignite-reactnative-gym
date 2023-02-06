import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack"

import { SignIn } from "@screens/SignIn"
import { SignUp } from "@screens/SignUp"

type AuthScreens = {
  signIn: undefined
  signUp: undefined
}

export type AuthNavigatorProps = NativeStackNavigationProp<AuthScreens>

const { Navigator, Screen } = createNativeStackNavigator<AuthScreens>()

export const AuthRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
      <Screen
        name="signIn"
        component={SignIn}
      />

      <Screen
        name="signUp"
        component={SignUp}
      />
    </Navigator>
  )
}
