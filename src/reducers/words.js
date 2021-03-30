//Words reducer

const wordsReducerDefaultState = [];

const wordsReducer = (state = wordsReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_WORD" :
            return [
                ...state,
                action.word
            ]
        case "REMOVE_WORD":
            return state.filter(({id}) => id !== action.id)
        case "RESET_WORDS":
            return []
        case "SET_WORDS":
            return action.words
        default: 
            return state;
    }
}

export default wordsReducer;