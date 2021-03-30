import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from "react-redux";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';
import { NewsContext } from '../context/context';
import { startLogin, startLogout } from "../actions/auth";
import { AuthContext } from "../context/Auth";

export const Homepage = ({navigation}) => {
  const { newsArray, setNewsArray, newsTitle, setNewsTitle } = useContext(NewsContext)
  const {currentUser} = useContext(AuthContext);
  const dispatch = useDispatch()

  const fetchUrl = async () => {
    await fetch(`http://newsapi.org/v2/top-headlines?country=jp&apiKey=bc31e9bea5d2436685e04722f71bcca9`, { 
      method: 'GET',
  })
    .then((res) => res.json())
    .then((data) => setNewsArray(data.articles))
  }
  
  useEffect(() => {
    fetchUrl()
  }, []);
//list item pour la lsite de news
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <View style={styles.logoAndTitle}>
          <Image style={styles.titleLogo} source={require("../image/nihongo.png")}/>
          <Text style={styles.titleText}>News</Text>
        </View>
        
        { 
          currentUser ? 
            
            <Text style={[styles.logText, styles.logButton]}>Logged</Text>
            
            : <TouchableOpacity style={styles.logButton} onPress={() => dispatch(startLogin())}>
                <Text style={styles.logText}>Login anonymously</Text>
              </TouchableOpacity>
        }
      </View>

      <ScrollView style={styles.scrollView}>

        { currentUser ? undefined : <Text>Log in to use the bookmark and revision features !</Text>}

        {newsArray ? 
          newsArray.map((news) => (
              <TouchableOpacity 
                style={styles.articleView}
                key={news.title} 
                onPress={() => {
                  setNewsTitle(news.title)
                  navigation.navigate("news")
                }}>
                <Image style={styles.image} source={{uri: news.urlToImage}}/>
                <Text style={styles.articleTitle}>{news.title}</Text>
              </TouchableOpacity>
            
          )) : undefined
        }
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    marginHorizontal: 5,
  },
  titleView: {
    alignItems: "center",
    backgroundColor: "#2F4F4F",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: "8%",
    paddingVertical: "2%"
  },
  titleLogo: {
    height: 40,
    marginRight: "3%",
    width: 40
  },
  titleText: {
    fontSize: 20
  },
  image: {
    height: 80,
    width: 80
  },
  articleView: {
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderBottomColor: "#778899",
    borderBottomWidth: 1,
    flexDirection: "row",
    paddingVertical: "1%"
  },
  articleTitle: {
    flexShrink: 1,
    fontSize: 10,
    marginLeft: "2%"
  },
  logButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 3
  },
  logText: {
    color: "white",
    fontWeight: "bold"
  }, 
  logoAndTitle: {
    alignItems: "center",
    flexDirection: "row"
  }
});