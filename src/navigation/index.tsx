import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import Home  from './screens/Home';
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
        title: 'Home',
        
      },
    },
    
  },
});

// AuthStack remains unchanged
const AuthStack = createNativeStackNavigator({
    screenOptions: {
    headerShown: false, // Hide header by default globally
    
  },
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
  screenOptions: {
    headerShown: false, // Hide header by default globally
    headerStyle: {
      backgroundColor: '#e6f881',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: '600',
    },
  },
  screens: {
    AuthStack: {
      screen: AuthStack,
      options: {
        headerShown: false,
      },
    },
    Survey: { 
      screen: Survey,
      options: {
        title: 'Intake Survey',
        headerShown: true, // Enable for this screen
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: 'Home',
        headerShown: true, // Enable for this screen
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerShown: true, // Enable for this screen
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: 'modal',
        headerShown: true, // Enable for this screen
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
        headerShown: true, // Enable for this screen
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
