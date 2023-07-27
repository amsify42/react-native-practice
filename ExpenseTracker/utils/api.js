import axios from "axios";

const API_BASE = 'http://192.168.0.176/';

function endpoint($uri) {
    return API_BASE+$uri;
}

export async function getExpenses() {
    let expenses = [];
    try {
        let response = await axios.get(endpoint('expenses'));
        if(response.status == 200) {
            expenses = response.data.data;
        }
    }
    catch(error) {
        console.log('error', error);
    }
    return expenses;
}

export async function createExpense(expenseData) {
    let id = null;
    try {
        let response = await axios.post(endpoint('expenses/'), expenseData);
        if(response.status == 200) {
            id = response.data.data;
        }
    }
    catch(error) {
        console.log('error', error);
    }
    return id;
}

export async function modifyExpense(id, expenseData) {
    let status = false;
    try {
        let response = await axios.post(endpoint('expenses/'+id), expenseData);
        if(response.status == 200) {
            status = true;
        }
    }
    catch(error) {
        console.log('error', error);
    }
    return status;
}

export async function removeExpense(id) {
    let status = false;
    try {
        let response = await axios.delete(endpoint('expenses/'+id));
        if(response.status == 200) {
            status = true;
        }
    }
    catch(error) {
        console.log('error', error);
    }
    return status;
}