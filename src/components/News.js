import React, { useState, useContext } from "react";
import { StyleSheet, ScrollView, View, Image, Text } from "react-native";
import { SearchBar } from 'react-native-elements';
import { ModalDictionary } from "./ModalDictionary";
import { NewsContext } from '../context/context';

export const News = () => {
    const { newsArray, setNewsArray, newsTitle, setNewsTitle } = useContext(NewsContext)

    const [selectedText, setSelectedText] = useState("")
    const [searchedText, setSearchedText] = useState("")
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const newsPressed = newsArray.filter((news) => news.title === newsTitle)

    const fetchJapaneseDictionaryApi = async () => {
        await fetch(`https://kanji-cors-bypass.herokuapp.com/api/${selectedText}`)
        .then((res) => res.json())
        .then((data) => setSearchedText(data))
    }

    const onSubmitEditing = () => {
      fetchJapaneseDictionaryApi()
      setModalIsOpen(true)
    }

    return (
        <View>
            <View style={styles.search}>
              <SearchBar 
                onChangeText={text => setSelectedText(text)}
                onSubmitEditing={onSubmitEditing}
                value={selectedText}
                searchIcon={false}
                placeholder="Search translation japanese-english"
                />
            </View>
            
            
            <View style={styles.news}>
              <Image style={styles.image} source={{uri: newsPressed[0].urlToImage}}/>
              <Text style={styles.title} selectable={true}>{'\n'}{newsPressed[0].title}{'\n'}</Text>

              <ScrollView style={styles.scrollView}>
                <Text selectable={true}>{newsPressed[0].description}{'\n'}</Text>
                <Text>{newsPressed[0].publishedAt}{'\n'}</Text>
                <Text selectable={true}>Author : {newsPressed[0].author}{'\n'}</Text>
                <Text selectable={true}>Source : {newsPressed[0].source.name}</Text>
              </ScrollView>
            </View>
            

            {modalIsOpen && searchedText ? <ModalDictionary modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} searchedText={searchedText}/> : undefined}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 5,
  },
  news: {
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    height: "40%",
    width: "40%"
  },
  search: {
    marginBottom: "1%",
    marginTop: "6%",
  },
  title: {
    flexShrink: 1,
  }
});