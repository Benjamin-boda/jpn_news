import React, { useContext } from "react";
import { Modal, View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { startAddWord } from "../actions/words";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/Auth";

export const ModalDictionary = ({ modalIsOpen, setModalIsOpen, searchedText }) => {
    const dispatch = useDispatch()
    const {currentUser} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            
            <Modal
                animationType="slide"
                visible={modalIsOpen}
                onRequestClose={() => {
                setModalIsOpen(false);
                }}
            >
                <ScrollView style={styles.scrollView}>
                    {
                        searchedText.map((text) => 
                        <View style={styles.wordViews} key={text.slug}>
                            
                                <Text>Word : {text.slug}</Text>
                                <Text>Pronunciation : {text.japanese[0].reading}</Text>
                                {
                                    text.senses.map((sense) => 
                                            <Text style={styles.meaning} key={sense.english_definitions}>{sense.english_definitions}</Text>
                                )}
                            
                            
                            <TouchableOpacity 
                                style={currentUser ? styles.addButton : styles.disabledAddButton}
                                onPress={currentUser ? () =>  {
                                    dispatch(startAddWord({
                                        japaneseWord : text.slug, 
                                        pronunciation : text.japanese[0].reading,
                                        meaning : text.senses[0].english_definitions
                                    }))
                                    setModalIsOpen(false)
                                } : undefined}
                            >
                                <Text style={styles.btnText}>Add to bookmark</Text>
                            </TouchableOpacity>
                        </View>    
                        
                    )}
                    <TouchableOpacity style={styles.closeBtn} onPress={() => setModalIsOpen(false)}>
                        <Text style={styles.btnText}>Close</Text>
                    </TouchableOpacity>
                </ScrollView>    
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    scrollView: {
        marginHorizontal: 10,
      },
    wordViews: {
        backgroundColor: "#F5F5F5",
        borderBottomColor: "#778899",
        borderBottomWidth: 1,
        justifyContent:"flex-start",
        paddingVertical: "2%",
        flex:1
    },
    addButton: {
        backgroundColor: "#778899",
        borderRadius: 20,
        marginVertical: 10,
        padding: 10,
        width: 130,
      },
    btnText: {
        color: "white",
        textAlign: "center"
    },
    closeBtn: {
        backgroundColor: "#2F4F4F",
        borderRadius: 20,
        marginVertical: 10,
        padding: 10,
        textAlign:"center",
    },
    disabledAddButton: {
        backgroundColor: "#778899",
        borderRadius: 20,
        marginVertical: 10,
        opacity: 0.2,
        padding: 10,
        width: 130,
      }
  });