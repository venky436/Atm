const authenticateState = {
    data:{}
};

export const authenticateReducer = (state = authenticateState, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state,
                data: action.payload
            }
        case 'USER_LOGOUT':
            return {
                ...authenticateState
            }
        case "USER_REGISTER":
            return {
                ...state,
                data: action.payload
            }
        default:
            return state
    }
};

let initialStateForAccount = {
    data : {}
}
export const accountReducer = (state = initialStateForAccount, action) => {
    switch (action.type) {
        case "SET_ACCOUNT_DETAILS":
            return {
                ...state,
                data: action.payload
            }
        case 'REFRESH_ACCOUNT_DETAILS':
            return {
                ...initialStateForAccount
            }
        default:
            return state
    }
};

let initialStateForTransactions = {
    transactions : []
}
export const transactionsReducer = (state = initialStateForTransactions, action) => {
    switch (action.type) {
        case "SET_TRANSACTIONS":
            return {
                ...state,
                transactions: action.payload
            }
        default:
            return state
    }
};



