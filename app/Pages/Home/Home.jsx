import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import colors from '../../Utils/colors';
import { Feather, AntDesign } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import TrendMovies from '../../Components/TrendingMovies';
import MovieList from '../../Components/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from '../Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { getCastMovie, getMoviePopular, getSimilarMovie, getTopRated, getUpComing } from '../../../Redux/movieSlice';


const ios = Platform.OS === 'ios'; // 

export default function Home() {
  const [loading, setLoading] = useState(false)
  const navigator = useNavigation()
  const dispatch = useDispatch();
  const { moviePopuler, 
    moviePopulerLoading, 
    moviePopularError,
    movieUpComing,
    movieUpComingLoading,
    movieUpComingError,
    movieTopRated,
    movieTopRatedLoading,
    movieTopRatedError
  } = useSelector(state => state.movie);

  useEffect(() => {
    dispatch(getMoviePopular());
    dispatch(getUpComing());
    dispatch(getTopRated());
    dispatch(getSimilarMovie());
    dispatch(getCastMovie());
  }, [dispatch]);

  if (moviePopulerLoading) return <Loading />;
  if (moviePopularError) return <Loading />;
  if (!moviePopuler) return <Loading />;
  if (movieUpComingLoading) return <Loading />;
  if (movieUpComingError) return <Loading />;
  if (!movieUpComing) return <Loading />;;
  if (movieTopRatedLoading) return <Loading />;
  if (movieTopRatedError) return <Loading />;
  if (!movieTopRated) return <Loading />;;

  const ali = () => {
console.log(movieTopRated);
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={ios ? { marginBottom: 2 } : { marginBottom: 3 }}>
        <StatusBar style="light" />
        <View style={styles.headerTop}>
          <Feather name="align-left" size={44} color={colors.textColorLight} />
          <Text style={styles.headerTopText}>
            <Text style={{ color: colors.mainColor }}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => ali()}>
            <AntDesign name="search1" size={40} color={colors.textColorLight} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading? (
          <Loading />
        ):(
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10}}
          >
            {/* Trend Olan Filmer */}
            <TrendMovies data={moviePopuler} />
    
            {/* Film listesi */}
            <MovieList title="Upcoming" data={movieUpComing} />
    
            {/* Top Film listesi */}
            <MovieList title="Top Rated" data={movieTopRated} />
          </ScrollView>
        )
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textColorDark,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 12,
    marginVertical: 12,
  },
  headerTopText: {
    color: colors.textColorLight,
    fontSize: 40,

  }
});
