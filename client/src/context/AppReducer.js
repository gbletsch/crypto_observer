export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'GET_BALANCE':
            return {
                ...state,
                balanceLoading: false,
                dailyBalance: action.payload
            }
        case 'BALANCE_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'GET_CROPS':
            return {
                ...state,
                cropsLoading: false,
                cropsHarvested: action.payload
            }
        case 'CROPS_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'DELETE_BALANCE':
            return {
                ...state,
                dailyBalance: state.dailyBalance.filter(b => b._id !== action.payload)
            }
        case 'ADD_BALANCE':
            return {
                ...state,
                dailyBalance: [...state.dailyBalance, action.payload]
            }
        case 'DELETE_CROPS':
            return {
                ...state,
                cropsHarvested: state.cropsHarvested.filter(c => c._id !== action.payload)
            }
        case 'ADD_CROPS':
            return {
                ...state,
                cropsHarvested: [...state.cropsHarvested, action.payload]
            }
        default:
            return state
    }
}