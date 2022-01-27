import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator,Share} from "react-native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-material-cards";
const API_URL =
  "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=cbd46bd6a4f54fe69d0cb261dbe1a878";
const request = new Request(API_URL);
function Sports() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getNews = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setData(json.articles);
      //console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const onShare = async (shareItem) => {
    try {
      const result = await Share.share({
        title:"NewsApp",
        url:"https://awesome.contents.com/",
        message:shareItem,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            

            <View >
              <Card>
                <CardImage
                  source={{ uri: item.urlToImage }}
                  title={item.source.name}
                />
                <CardTitle
                  title={item.title}
                  textStyle={{fontWeight:'bold'}}
                />
                <CardContent text={item.description}/>
                <CardAction separator={true} inColumn={false}>
                  <CardButton onPress={() => {onShare(item.title)}} title="Share" color="green" />
                </CardAction>
              </Card>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default Sports;

