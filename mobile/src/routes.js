import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'DevRadar'
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        title:'Perfil no Github'
      }
    },
  }, {
    headerLayoutPreset:'center',
    defaultNavigationOptions: {
      headerTintColor: '#FFF',
      headerBackTitleVisible:null,
      headerStyle: {
        // Estilização do container
        backgroundColor:'#2678d8',
      }
    }
  })
);

export default Routes;