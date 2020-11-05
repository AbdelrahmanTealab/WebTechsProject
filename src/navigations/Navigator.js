import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from '../screens/Login';
import Registration from '../screens/Registration';
import Welcome from '../screens/Welcome';
import Mainscreen from '../screens/Mainscreen';


const StackNavigatorOptions = {
    headerShown:false
}
const AppNavigator = createStackNavigator({
    Welcome:{screen:Welcome},
    Login:{screen:Login},
    Registration:{screen:Registration},
    Mainscreen:{screen:Mainscreen}
},
{
 defaultNavigationOptions : StackNavigatorOptions
});
export default createAppContainer(AppNavigator);