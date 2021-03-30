import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export const ReviseWords = () => {
    const [revealAnswer, setRevealAnswer] = useState(false)
    const [wordsIndex, setWordsIndex] = useState(0)
    const [wordsNumber, setWordsNumber] = useState([])
    const [revision, setRevision] = useState(true)
    const [resetRevision, setResetRevision] = useState(false)

    const wordsInStore = useSelector(state => state.words)

    useEffect(() => {
        let wordsLenght = []
        for (let i = 0; i < wordsInStore.length; i++) {
            wordsLenght.push(i)
        }
        setWordsNumber(wordsLenght)
        setResetRevision(false)
    }, [resetRevision])

    const onPress = () => {
        setRevealAnswer(true)
    }

    const knownWord = () => {
        if ( wordsNumber.length === 1 ) {
            setRevision(false)
        } else {
            for (let i = 0; i < wordsNumber.length; i++) {

                if ( wordsNumber[i] === wordsIndex) { 
        
                    wordsNumber.splice(i, 1); 
                }
            }
        }
        
        
        if ( wordsNumber ) {
            if ( wordsIndex === wordsNumber[wordsNumber.length -1] ) {
                setWordsIndex(wordsNumber[0])
            } else {
                setWordsIndex(wordsIndex + 1)
            } 
        }
        
        setRevealAnswer(false)
    }

    const unknownWord = () => {
        if ( wordsNumber ) {
            if ( wordsIndex === wordsNumber[wordsNumber.length -1] ) {
                setWordsIndex(wordsNumber[0])
            } else {
                setWordsIndex(wordsIndex + 1)
            } 
        }
        setRevealAnswer(false)
    }

    return (
        <View style={styles.container}>
        
            {
                revision ? 
                    <View style={styles.cardView}>
                        <Text style={styles.cardTitle}>{wordsInStore[wordsIndex].japaneseWord}</Text>

                        <TouchableOpacity style={styles.revealButton} onPress={onPress}>
                            <Text style={styles.btnText}>REVEAL THE ANSWER</Text>
                        </TouchableOpacity>
                        

                        {
                            revealAnswer ? 
                                <View>
                                    <Text style={styles.answerText}>Pronunciation : {wordsInStore[wordsIndex].pronunciation}</Text>
                                    {
                                        wordsInStore[wordsIndex].meaning.length > 1 ? 
                                            wordsInStore[wordsIndex].meaning.map((sense) => 
                                                    <Text style={styles.answerText} key={sense}>{sense}</Text>
                                            ) : <Text>{wordsInStore[wordsIndex].meaning}</Text>
                                    }
                                    <View style={styles.cardButtonView}>
                                        <TouchableOpacity style={styles.dontKnowButton} onPress={unknownWord}>
                                            <Text style={styles.btnText}>I DON'T KNOW</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.revealButton} onPress={knownWord}>
                                            <Text style={styles.btnText}>EASY</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : undefined
                        }

                    </View>

                    :   <View style={styles.finishView}>
                            <Text>You have finished your revision !</Text>
                            <TouchableOpacity style={styles.revealButton} onPress={() => setRevision(true)}>
                                <Text style={styles.btnText}>RESET REVISION</Text>
                            </TouchableOpacity>
                        </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',  
      flex: 1,
      marginTop: "10%"
    },
    scrollView: {
        marginHorizontal: 5,
      },
    cardView: {
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderColor: "#778899",
        borderWidth: 1,
        justifyContent:"center",
        flex:1,
        
    },
    cardTitle: {
        fontSize: 40,
        marginBottom:"5%"
    },
    revealButton: {
        backgroundColor: "#2196F3",
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      },
    dontKnowButton: {
        backgroundColor: "#D2691E",
        borderRadius: 5,
        marginVertical: 10,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    btnText: {
        color: "white",
        textAlign: "center"
    },
    answerText: {
        fontSize:20,
    },
    cardButtonView: {
        flexDirection: "row", 
        justifyContent: "space-between",
        marginTop: "3%"
    },
    finishView: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "50%"
    }
  });