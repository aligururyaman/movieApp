import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import colors from '../../Utils/colors'

var {width, height} = Dimensions.get('window');

export default function Loading() {
  return (
    <View style={styles.container}>
      <Progress.CircleSnail thickness={15} size={260} color={colors.mainColor}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.textColorDark
  }
})