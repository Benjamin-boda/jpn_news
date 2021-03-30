import database from "../firebase/firebase";
import firebase from 'firebase/app'

//ADD_WORD

export const addWord = (word) => ({
    type: "ADD_WORD",
    word
});

export const startAddWord = (wordData) => {
    return (dispatch) => {
        const uid = firebase.auth().currentUser.uid;
        const {
            japaneseWord = "",
            pronunciation = "",
            meaning = ""
        } = wordData;
        const word = {japaneseWord, pronunciation, meaning};

        return database.ref(`users/${uid}/words`).push(word).then((ref) => {
            dispatch(addWord({
                id: ref.key,
                ...word
            }))
        })
    }
}

//REMOVE_WORD

export const removeWord = ({id} = {}) => ({
    type: "REMOVE_WORD",
    id
});

export const startRemoveWord = ({id}) => {
    return (dispatch) => {
        const uid = firebase.auth().currentUser.uid;
        return database.ref(`users/${uid}/words/${id}`).remove().then(() => {
            dispatch(removeWord({id}))
        })
    }
}

//SET_WORDS

export const setWords = (words) => ({
    type: "SET_WORDS",
    words
})

export const startSetWords = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/words`).once("value").then((snapshot) => {
            const words = [];

            snapshot.forEach((childSnapshot) => {
                words.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                })
            })
        dispatch(setWords(words))
        })
    }
}

//REMOVE ALL

export const resetWords = () => ({
    type: "RESET_WORDS"
});

export const startResetWords = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/words`).remove()
            .then(() => {
                dispatch(resetWords());
            });
    };
};