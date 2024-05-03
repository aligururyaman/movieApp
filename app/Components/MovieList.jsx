import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import React from 'react'
import colors from '../Utils/colors'
import { useNavigation } from '@react-navigation/native'

var {width, height} = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll}) {
  const navigation = useNavigation()
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={styles.seeText}>See All</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator
        contentContainerStyle={{paddingVertical: 15, gap:5}}
      >
        {
          data.results.map((item, index) => {
            return (
              <TouchableOpacity 
                key={index}
                onPress={() => navigation.navigate('MovieScreen', item)}
              >
                <View style={styles.movieImg}>
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                    style={{borderRadius: 12, width: width*0.33, height: height*0.22 }}
                  />
                </View>
                <Text style={styles.movieTitle}>
                  {
                    item.title.length>20 ? item.title.slice(0,20)+'...' : item.title
                  }
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  topContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText:{
    color: colors.textColorMed,
    fontSize: 24
  },
  seeText: {
    fontSize: 18,
    color: colors.mainColor
  },
  movieImg: {
    marginRight: 6
  },
  movieTitle: {
    color: colors.textColorMed,
    marginLeft: 2,

  }
})