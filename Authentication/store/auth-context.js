import { Alert } from "react-native";
import { loginUser, registerUser } from "../utils/api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { createContext, useState } = require("react");

export const AuthContext = createContext({
    isLoggedIn: false,
    setLoggedIn: (loggedIn) => {},
    login: (email, password) => {},
    register: (email, password) => {},
    logout: () => {}
});

function AuthContextProvider({children}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function setLoggedIn() {
        setIsLoggedIn(true);
    }

    function login(email, password) {
        loginUser(email, password).then((user) => {
            if(user) {
                AsyncStorage.setItem('id', user.id);
                setIsLoggedIn(true);
            } else {
                Alert.alert('Invalid', 'Wrong email or password');
            }
        })
    }

    function register(email, password) {
        registerUser(email, password).then((result) => {
            if(result.user) {
                AsyncStorage.setItem('id', result.user.id);
                setIsLoggedIn(true);
            } else {
                Alert.alert('Not Registered', result.message);
            }
        })
    }

    function logout() {
        AsyncStorage.removeItem('id');
        setIsLoggedIn(false);
    }

    const value = {
        isLoggedIn: isLoggedIn,
        setLoggedIn: setLoggedIn,
        login: login,
        register: register,
        logout: logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;