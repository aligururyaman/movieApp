import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import colors from '../Utils/colors';
import { useDispatch, useSelector } from 'react-redux';
import { getCastMovie, getIdtoInfo, getSimilarMovie } from '../../Redux/movieSlice';

const { width, height } = Dimensions.get('window');

export default function TrendMovies({ data }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const handleClick = async (item) => {
    if (item.id) {
      try {
        await fetchData(item.id);
        navigation.navigate('MovieScreen', item);
      } catch (error) {
        console.error("Failed to fetch movie details", error);
      }
    }
  };
  
  const fetchData = async (movieId) => {
    try {
      setLoading(true);
      await dispatch(getIdtoInfo(movieId)).unwrap();

      await dispatch(getSimilarMovie(movieId)).unwrap();

      await dispatch(getCastMovie(movieId)).unwrap();

    } catch (error) {
      console.error('Failed to fetch data for movie with ID:', movieId, error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Trends</Text>
      <Carousel
        data={data.results}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleClick(item)}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.movieImg}
            />
            <Text style={styles.movieTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
        firstItem={1}
        inactiveSlideOpacity={0.60}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      />
      {loading && <Text>Loading...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  topTitle: {
    fontSize: 33,
    fontWeight: 'bold',
    color: colors.textColorMed,
    textAlign: 'center',
    marginBottom: 12
  },
  movieImg: {
    borderRadius: 12,
    width: width * 0.6,
    height: height * 0.4
  },
  movieTitle: {
    color: colors.textColorMed,
    marginTop: 5,
    textAlign: 'center',
  }
});
