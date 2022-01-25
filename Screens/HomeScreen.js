import React,{useState,useEffect} from 'react';
import { Text, View , FlatList, ActivityIndicator} from 'react-native';


const API_URL="?country=in&category=business&apiKey=cbd46bd6a4f54fe69d0cb261dbe1a878";
const request = new Request(API_URL);
function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
    const getMovies = async () => {
      try {
       const response = await fetch(request,{
         method:'GET',
         headers :{
          "Content-Type":"application/json"
         }
       });
       const result = await response.json();
       setData(result);
       console.log(result)
     } catch (error) {
       console.error(error);
     } finally {
       setLoading(false);
     }
   }

    useEffect(() => {
      getMovies();
    }, []);

 
    return (
      <View style={{ flex: 1, padding: 24 }}>
        {/* {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.title}, {item.description}</Text>
            )}
          />
        )} */}
      </View>
    );
  }

  export default Home