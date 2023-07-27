import axios from "axios";

const API_BASE = 'http://192.168.0.104/auth/';

function endpoint($uri) {
    console.log(API_BASE+$uri);
    return API_BASE+$uri;
}

export async function registerUser(email, password) {
    let result = {user: null, message: 'User not registered'};
    try {
        let response = await axios.post(endpoint('register'), {
            email: email,
            password: password
        });
        if(response.status == 200) {
            result.user = response.data.data;
        } else {
            result.message = response.data.message;
        }
    }
    catch(error) {
        result.message = error.response.data.message;
        console.log('error', error.response.data.message);
    }
    return result;
}

export async function loginUser(email, password) {
    let user = null;
    try {
        let response = await axios.post(endpoint('login'), {
            email: email,
            password: password
        });
        if(response.status == 200) {
            user = response.data.data;
        }
    }
    catch(error) {
        console.log('error', error);
    }
    return user;
}