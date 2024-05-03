import { View, Text, Dimensions, Platform, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../Utils/colors';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../../Components/MovieList'
import Loading from '../Loading/Loading';
import { getCastMovie, getPersonMovie, getPersonMovieData } from '../../../Redux/movieSlice';
import { useDispatch, useSelector } from 'react-redux';


var {width, height} = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? {}: {marginVertical: 40}

export default function PersonScreen() {
  const {params: person} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovie, setPersonMovie] = useState([1,2,3,4])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { movieGetPerson,
    movieGetPersonLoading,
    movieGetPersonError,
    movieGetPersonData
  } = useSelector(state => state.movie);

  useEffect(() => {
    fetchData(person.id);
  },[person]);

  const fetchData = async (personId) => {
    try {
      setLoading(true);
      await dispatch(getPersonMovie(personId)).unwrap();
      await dispatch(getPersonMovieData(personId)).unwrap();
    } catch (error) {
      console.error(`Failed to fetch data for person with ID ${personId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  if (movieGetPersonLoading) return <Loading />;
  if (movieGetPersonError) return <Loading />;
  if (!movieGetPerson) return <Loading />;

  const ali = () => {
    console.log(movieGetPersonData);
  }

  return (
    <ScrollView style={styles.container}
      contentContainerStyle={{paddingBottom: 100}}
    >
      <SafeAreaView style={[styles.containerSafe, verticalMargin]} >
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
          <View style={{top: '10%'}}>
            <View style={styles.personDetail}>
              <View style={styles.personCon}>
                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${person.profile_path}` }}
                  style={{height: height*0.43, width:width*0.74}}
                />
              </View>
            </View>
            <View style={styles.personInfo}>
              <Text style={styles.personNameText}>
                {person.name}
              </Text>
              <Text style={styles.personFromText}>
                {movieGetPerson.place_of_birth}
              </Text>
            </View>
            <View style={styles.personİnfoCon}>
              <View style={styles.personDesc}>
                <Text style={styles.personDescGender}>Gender</Text>
                <Text style={styles.personDescGen}> {person.gender === 1 ? "Female" : person.gender === 0 ? "Male" : "Unknown"}</Text>
              </View>
              <View style={styles.personDesc}>
                <Text style={styles.personDescGender}>Birthday</Text>
                <Text style={styles.personDescGen}>{movieGetPerson.birthday}</Text>
              </View>
              <View style={styles.personDesc}>
                <Text style={styles.personDescGender}>Known For</Text>
                <Text style={styles.personDescGen}>{person.known_for_department}</Text>
              </View>
              <View style={styles.personDescLast}>
                <Text style={styles.personDescGender}>Popularty</Text>
                <Text style={styles.personDescGen}>{person.popularity}</Text>
              </View>
            </View>
            <View style={styles.biograf}>
              <Text style={styles.bioText}>
                Biography
              </Text>
              <Text style={styles.bioInfo}>
                {movieGetPerson.biography}
              </Text>
            </View>
            {/* <MovieList data={movieGetPersonData} title="ali" hideSeeAll={true}/> */}
          </View>
        )
      }

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor: colors.textColorDark
  },
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
  personDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: 'grey',
    shadowRadius: 40,
    shadowOffset: {width: 0, height:5},
    shadowOpacity: 1,
  },
  personCon: {
    alignItems: 'center',
    overflow: 'hidden',
    height: 300,
    width: 300,
    borderWidth: 2,
    borderRadius: 200,
    borderColor:colors.textShadow
  },
  personInfo: {
    marginTop: 20,
    gap: 7
  },
  personNameText: {
    fontSize: 34,
    color: colors.textColorLight,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  personFromText: {
    fontSize: 20,
    color: colors.textShadow,
    textAlign: 'center'
  },
  personİnfoCon: {
    marginHorizontal: 8,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.textShadow,
    borderRadius: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 7
  },
  personDesc: {
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: colors.textColorDark,
    paddingHorizontal: 20
  },
  personDescLast: {
    alignItems: 'center',
    borderColor: colors.textColorDark,
    paddingHorizontal: 20
  },
  personDescGender: {
    fontSize: 12,
    color: colors.textColorMed,
    fontWeight: '700'
  },
  personDescGen: {
    fontSize: 16,
    color: colors.textColorDark,
    fontWeight: '400'
  },
  biograf: {
    marginVertical: 22,
    marginHorizontal: 12,
  },
  bioText: {
    color: colors.textColorMed,
    fontSize: 20
  },
  bioInfo: {
    color: colors.textColorLight,

  }
})