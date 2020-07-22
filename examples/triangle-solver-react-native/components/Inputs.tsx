import React from 'react'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from 'react-native';

const Inputs = ({triangle, handleValueChange}) => {
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior='padding'
      >
      <View style={styles.inputsWrapper}>
        <Text style={styles.header3}>Sides</Text>

        <View style={styles.inputField}>
          <Text style={styles.label}>a</Text>
          <TextInput 
            onChange={num=>{
              console.log(num)
              handleValueChange('a', num)}}
            keyboardType='numeric'
            value={triangle.sides.a}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>b</Text>
          <TextInput 
            onChange={num=>handleValueChange('b', num)}
            keyboardType='numeric'
            value={triangle.sides.b}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>c</Text>
          <TextInput 
            onChange={num=>handleValueChange('c', num)}
            keyboardType='numeric'
            value={triangle.sides.c}
            style={styles.input}
          />
        </View>
      </View>

      <View style={styles.inputsWrapper}>
        <Text style={styles.header3}>Angles</Text>

        <View style={styles.inputField}>
          <Text style={styles.label}>A</Text>
          <TextInput 
            onChange={num=>handleValueChange('A', num)}
            keyboardType='numeric'
            value={triangle.angles.A}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>B</Text>
          <TextInput 
            onChange={num=>handleValueChange('B', num)}
            keyboardType='numeric'
            value={triangle.angles.B}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>C</Text>
          <TextInput 
            onChange={num=>handleValueChange('C', num)}
            keyboardType='numeric'
            value={triangle.angles.C}
            style={styles.input}
          />
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around'
  },
  inputsWrapper: {
  },
  header3: {
    fontSize: 16,
    margin: 5,
    color: 'white'
  },
  inputField: {
    flexDirection: "row",
    margin: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    padding: 3,
    width: 100
  },
  label: {
    color: 'white'
  },
  input: {
    textAlign: "right",
    color: 'white',
    flex: 1
  }
});

export default Inputs