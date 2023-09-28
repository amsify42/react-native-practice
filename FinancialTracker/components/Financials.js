import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import ToPay from "./ToPay";
import ToReceive from "./ToReceive";

const Tab = createBottomTabNavigator();

function Financials() {
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name="ToPay" component={ToPay} options={{
                tabBarLabel: 'To Pay',
                tabBarIcon: ({color, size}) => (<Ionicons name="arrow-up-circle-outline" color={color} size={size}/>)
            }}/>
            <Tab.Screen name="ToReceive" component={ToReceive}  options={{
                tabBarLabel: 'To Receive',
                tabBarIcon: ({color, size}) => (<Ionicons name="arrow-down-circle-outline" color={color} size={size}/>)
            }}/>    
        </Tab.Navigator>
    )
}

export default Financials;