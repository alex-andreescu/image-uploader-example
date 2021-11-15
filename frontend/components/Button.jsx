import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'


export function Button ({ title, onPress }) {
  const styles = StyleSheet.create({
    button: {
      borderRadius: 10,
      padding: 10,
      margin: 10,
      alignItems: 'center',
    },
  })

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'darkblue' : 'lightblue',
        },
        styles.button,
      ]}
      onPress={onPress}
    >
      <Text>{title}</Text>
    </Pressable>
  )
}