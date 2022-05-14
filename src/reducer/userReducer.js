function userReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload,
            }
        case 'SET_CITY':
            return {
                ...state,
                city: action.payload,
            }
        case 'STORE_NAME':
            localStorage.setItem('name', state.name)
            return state
        case 'STORE_CITY':
            localStorage.setItem('city', state.city)
            return state
        default:
            return {...state }
    }
}

export { userReducer }