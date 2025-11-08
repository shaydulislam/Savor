import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import Survey from './screens/Survey';
import { NotFound } from './screens/NotFound';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';


const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Feed',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    
  },
});

// AuthStack remains unchanged
const AuthStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: LoginScreen,
      options: {
        title: 'Login',
      },
    },
    Register: {
      screen: RegisterScreen,
      options: {
        title: 'Register',
      },
    },
  },
});

// Updated RootStack: Add Survey screen after AuthStack
const RootStack = createNativeStackNavigator({
  screens: {
    AuthStack: {
      screen: AuthStack,
      options: {
        headerShown: false,
      },
    },
    Survey: { // Add this new screen
      screen: Survey,
      options: {
        title: 'Intake Survey', // Customize as needed
        // Add other options like headerShown: false if you want no header
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: false,
      },
    },
    Profile: {
      screen: Profile,
      linking: {
        path: ':user(@[a-zA-Z0-9-_]+)',
        parse: {
          user: (value) => value.replace(/^@/, ''),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
      },
      linking: {
        path: '*',
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}