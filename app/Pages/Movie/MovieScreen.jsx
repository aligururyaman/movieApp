import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import colors from '../../Utils/colors'
import { Entypo, AntDesign  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../../Components/Cast';
import MovieList from '../../Components/MovieList'
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';


var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? {}: {marginTop: 50}

export default function MovieScreen() {
  const {params: item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const [cast, setCast] = useState([1,2,3,4,5])
  const [loading, setLoading] = useState(false)
  const [idToInfo, setIdToInfo] = useState()
  const navigation = useNavigation();
  const dispatch = useDispatch()


  const {
    movieGetId,
    movieGetIdLoading,
    movieGetIdError,
    movieGetSimilar,
    movieGetCast,
    movieGetSimilarLoading,
    movieGetSimilarError,
    movieGetCastLoading,
    movieGetCastError
  } = useSelector(state => state.movie);

  if (movieGetIdLoading) return <Loading />;
  if (movieGetIdError) return <Loading />;
  if (!movieGetId) return <Loading />;
  if (movieGetSimilarLoading) return <Loading />;
  if (movieGetSimilarError) return <Loading />;
  if (!movieGetSimilar) return <Loading />;
  if (movieGetCastLoading) return <Loading />;
  if (movieGetCastError) return <Loading />;
  if (!movieGetCast) return <Loading />;


const casting =  movieGetCast.cast

const ali = () => {
  console.log(movieGetSimilar);
}
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 20}}
      style={{flex: 1, backgroundColor: colors.textColorDark}}
    >
        <SafeAreaView style={[styles.containerSafe, topMargin]} >
          <TouchableOpacity style={styles.firstTouch} onPress={() => ali()}>
            <Entypo name="chevron-left" size={40} color={colors.textColorMed} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
            <AntDesign name="heart" size={40} color={isFavourite? colors.mainColor : colors.textColorMed} />
          </TouchableOpacity>
        </SafeAreaView>
        {
          loading? (
            <Loading />
          ):(
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.mainImage} />
              <LinearGradient
                colors={['transparent', 'rgba(49, 54, 63, 0.1)', 'rgba(49, 54, 63, 2)']}
                start={{x:0.5, y:0}}
                end={{x: 0.5, y:1}}
                style={styles.linearGradient}
              />
            </View>
            <View style={styles.movieDetails}>
              <Text style={styles.detailText}>
                {
                  item.title
                }
              </Text>
              <Text style={styles.statusText}>
                {item.release_date}
              </Text>
              <View style={styles.genres}>
                <Text style={styles.statusText}>
                {movieGetId.genres[0]?.name || ""} ⁃ 
                </Text>
                <Text style={styles.statusText}>
                {movieGetId.genres[1]?.name || ""} ⁃
                </Text>
                <Text style={styles.statusText}>
                <Text style={styles.statusText}>
                {movieGetId.genres[2]?.name || ""}
                </Text>
                </Text>
              </View>
              <Text style={styles.descText}>
                {item.overview}
              </Text>
            </View>

            <Cast navigation={navigation} cast={casting} />
            
            <MovieList title="Similar Movies" data={movieGetSimilar} hideSeeAll={true} />
          </View>
          )
        }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  containerSafe: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    zIndex: 10,
  },
  firstTouch: {
    borderRadius: 12,
    padding: 2,
    backgroundColor: colors.mainColor,
  },
  mainImage: {
    width: width,
    height: height*0.60,
    objectFit:'fill',

  },
  linearGradient: {
    width,
    height: height*0.40,
    position : 'absolute',
    bottom: 0
  },
  movieDetails: {
    marginTop: -(height*0.09),
    gap: 2
  },
  detailText: {
    color: colors.textColorLight,
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold'
  },
  statusText: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textShadow
  },
  genres:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 4,
    gap: 2
  },
  descText: {
    color: colors.textShadow,
    marginVertical: 4,
    margin:10
  },
  imageContainer: {
    
  }
})