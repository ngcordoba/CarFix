const initialState = {
    repairs: [],
};

const fixReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_REPAIR':
            return {
                ...state,
                repairs: [...state.repairs, action.payload],
            };
        case 'ADD_REPAIR':
            return {
                ...state,
                repairs: [...state.repairs, action.payload],
            };
        default:
            return state;
    }
};

export default fixReducer;
