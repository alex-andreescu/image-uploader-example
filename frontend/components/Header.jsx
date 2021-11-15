import React from 'react'
import { Text, View, StyleSheet } from 'react-native'


export function Header ({ title }) {
  const styles = StyleSheet.create({
    header: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 40,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{title}</Text>
    </View>
  )
}
