import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import colors from '../Utils/colors'

var {width, height} = Dimensions.get('window');

export default function Cast({ cast, navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.castText}></Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 3}}
      >
        {
          cast && cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.castMap}
                onPress={() => navigation.navigate('PersonScreen', person)}
              >
                <View style={styles.imageContainer}>
                  <Image style={styles.castImg} source={{ uri: `https://image.tmdb.org/t/p/w500${person.profile_path}` }} />
                </View>
                <Text style={styles.mapText}>
                  {
                    person.name.length>10? person.name.slice(0,10)+'...': person.name
                  }
                </Text>
                <Text style={{color: colors.textShadow, fontSize: 20, marginTop: 5}}>
                  {
                    person.character.length>10? person.character.slice(0,10)+'...': person.character
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
  container:{
    marginVertical: 10
  },
  castText: {
    color: colors.textColorLight,
    fontSize: 28,
    marginVertical: 8,
    marginBottom: 5
  },
  castMap:{
    marginRight: 8,
    alignItems: 'center',

  },
  mapText: {
    color: colors.textColorLight,
    fontSize: 20,
    marginTop: 3
  },
  castImg: {
    borderRadius:50,
    height: 84,
    width: 80
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: '100%',
    height: 84,
    width: 80,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.textShadow
  }
})