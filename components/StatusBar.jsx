import { StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar";

const StatusBarComp = ({style, background}) => {
  return (
    <StatusBar style={style} backgroundColor={background}/>
  )
}

export default StatusBarComp

const styles = StyleSheet.create({})