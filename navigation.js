import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DestinationList from './components/DestinationList';
import DestinationDetails from './components/DestinationDetails';
import AddDestination from './components/AddDestination';
import EditDestination from './components/EditDestination';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DestinationList">
        <Stack.Screen name="DestinationList" component={DestinationList} options={{ title: 'Lista de Destinos' }} />
        <Stack.Screen name="DestinationDetails" component={DestinationDetails} options={{ title: 'Detalles del Destino' }} />
        <Stack.Screen name="AddDestination" component={AddDestination} options={{ title: 'Agregar Destino' }} />
        <Stack.Screen name="EditDestination" component={EditDestination} options={{ title: 'Editar Destino' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}