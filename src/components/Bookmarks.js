import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { startRemoveWord } from "../actions/words";

export const Bookmarks = () => {
    const wordsInStore = useSelector(state => state.words)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {
                    wordsInStore.length > 0 ?
                        wordsInStore.map((word) => 
                            <View style={styles.bookmarkView} key={word.japaneseWord}>
                                <Text>Word : {word.japaneseWord}</Text>
                                <Text>Pronunciation : {word.pronunciation}</Text>

                                {
                                    word.meaning.length > 1 ? 
                                        word.meaning.map((sense) => 
                                            <Text key={sense}>{sense}</Text>
                                    ) : <Text>{word.meaning}</Text>
                                }

                                <TouchableOpacity style={styles.removeButton} onPress={() => dispatch(startRemoveWord(word))}>
                                    <Text style={styles.btnText}>Remove</Text>
                                </TouchableOpacity>
                            </View>
                        ) : undefined
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',  
      flex: 1,
      marginTop: "5%"
    },
    scrollView: {
        marginHorizontal: 5,
      },
    bookmarkView: {
        backgroundColor: "#F5F5F5",
        borderBottomColor: "#778899",
        borderBottomWidth: 1,
        justifyContent:"flex-start",
        paddingVertical: "2%",
        flex:1
    },
    removeButton: {
        backgroundColor: "#778899",
        borderRadius: 20,
        marginVertical: 10,
        padding: 10,
        width: 130,
      },
    btnText: {
        color: "white",
        textAlign: "center"
    }
  });