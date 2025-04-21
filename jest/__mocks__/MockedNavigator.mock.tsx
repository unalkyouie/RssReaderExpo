import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ReactNode } from "react";

import { RootStackParamList } from "~/navigation/types";

export function mockedNavigationProps<
  ScreenName extends keyof RootStackParamList,
>(
  params: RootStackParamList[ScreenName],
): {
  navigation: NativeStackNavigationProp<RootStackParamList, ScreenName>;
  route: RouteProp<RootStackParamList, ScreenName>;
} {
  return {
    navigation: {
      navigate: jest.fn(),
      goBack: jest.fn(),
    } as any,
    route: { params } as any,
  };
}
type Props = { children?: ReactNode };

export const MockedNavigator = ({ children }: Props) => (
  <NavigationContainer>{children}</NavigationContainer>
);
