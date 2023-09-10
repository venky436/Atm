import axios from 'axios'

export const loginAction = (username, password) => async (dispatch, getState) => {
    try{

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await axios.post('http://127.0.0.1:8000/atm/login', { 'username': username, 'password': password }, config);
         localStorage.setItem('token',res.data.access)
         dispatch({
            type : 'USER_LOGIN',
            payload : res.data
         })
    }catch(error){
        console.log(error)
    }
}

export const logOut = () => async (dispatch, getState) => {
    localStorage.removeItem('token')
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    let res = await axios.post('http://127.0.0.1:8000/atm/logout',config);
     dispatch({
        type : 'USER_LOGOUT',
        payload : res.data
     })
     dispatch({
        type : 'REFRESH_ACCOUNT_DETAILS',
     })
}


export const registerAction = (data) => async (dispatch, getState) => {
    try{

        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await axios.post('http://127.0.0.1:8000/atm/register',data,config);
        console.log({res})
        localStorage.setItem('token',res.data.access)
         dispatch({
            type : 'USER_REGISTER',
            payload : res.data
         })
    }catch(error){
        console.log(error)
    }
}


export const accountAction = () => async (dispatch, getState) => {
    let token = localStorage.getItem('token')
    try{
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }
        let res = await axios.get('http://127.0.0.1:8000/atm/account',config);
         dispatch({
            type : 'SET_ACCOUNT_DETAILS',
            payload : res.data
         })
    }catch(error){
        console.log(error)
    }
}

export const depositeAction = async (data) => {
    let token = localStorage.getItem('token')
    try{
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }
        let res = await axios.post('http://127.0.0.1:8000/atm/deposite',data,config);
        return res?.data
        
    }catch(error){
        return error
    }
}
export const withdrawlAction =async (data) => {
    let token = localStorage.getItem('token')
    try{
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }
        let res = await axios.post('http://127.0.0.1:8000/atm/withdrawl',data,config);
        return res?.data
    }catch(error){
        return error
    }
}

export const transactionsAction = (accountNumber) => async (dispatch, getState) => {
    let token = localStorage.getItem('token')
    try{
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`
            }
        }
        let res = await axios.post('http://127.0.0.1:8000/atm/transactions',{account_number :accountNumber},config);
         dispatch({
            type : "SET_TRANSACTIONS",
            payload : res?.data
         })
    }catch(error){
        console.log(error)
    }
}



