import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native'
import colors from '../../Utils/colors'
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Loading from '../Loading/Loading';

var {width, height} = Dimensions.get('window');

export default function SearchScreen() {
  const navigator = useNavigation();
  const [results, setResult] = useState([])
  const [loading, setLoading] = useState(false)
  const movieName = "Yüzüklerin Efendisi"

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.col}>
        <TextInput
          placeholder='Search Movie'
          placeholderTextColor={'gray'}
          style={styles.textInput}
        />
        <TouchableOpacity
          onPress={() => navigator.navigate('Home')}
          style={styles.closeTouch}
        >
          <FontAwesome6 name="circle-xmark" size={44} color="white" />
        </TouchableOpacity>
      </View>
      {
        loading? (
          <Loading />
        ):(
          results.length>0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingHorizontal: 15}}
              style={styles.scrollContainer}
            >
              <Text style={styles.resultText}>Results({results.length})</Text>
              <View style={styles.resultContainer}>
                {
                  results.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => navigator.navigate('MovieScreen', item)}
                      >
                        <View style={styles.imageMap}>
                          <Image 
                            source={require('../../Images/mainBg.png')} 
                            style={{
                              borderRadius: 20,
                              width: width*0.44,
                              height: height*0.3
                            }}
                          />
                          <Text style={styles.textMap}>
                            {
                              movieName.length>22? movieName.slice(0,22)+'...': movieName
                            }
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </ScrollView>
        ):(
          <View style={styles.noResults}>
          <Image source={require('../../Images/resultempty.png')}
            style={{height:350, width:350}}
          />  
        </View>
        )
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.textColorDark
  },
  col: {
    marginHorizontal: 10,
    marginVertical: 8,
    justifyContent: 'space-between',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.textShadow,
    flexDirection: 'row'
  },
  textInput:{
    flex: 1,
    paddingBottom: 1,
    paddingLeft: 12,
    fontWeight: '600',
    fontSize: 24,
    color: colors.textColorMed,
    alignItems: 'baseline'
  },
  closeTouch: {
    margin: 4,
    backgroundColor: colors.textShadow,
    borderRadius: 100
  },
  resultText:{
    color: colors.textColorMed,
    fontWeight: '600',
    marginLeft: 3
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 15
  },
  imageMap: {
    marginBottom : 15
  },
  textMap: {
    color: colors.textColorMed,
    marginLeft: 10,
    textAlign: 'center'
  },
  noResults: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

