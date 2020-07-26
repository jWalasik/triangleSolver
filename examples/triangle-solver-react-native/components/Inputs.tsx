import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';

const Inputs = ({triangle, handleValueChange}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputsWrapper}>
        <Text style={styles.header3}>Sides</Text>

        <View style={styles.inputField}>
          <Text style={styles.label}>a</Text>
          <TextInput 
            onChangeText={num=>handleValueChange('a', num)}
            keyboardType='numeric'
            value={triangle.sides.a}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>b</Text>
          <TextInput 
            onChangeText={num=>handleValueChange('b', num)}
            keyboardType='numeric'
            value={triangle.sides.b}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>c</Text>
          <TextInput 
            defaultValue='length'
            onChangeText={num=>handleValueChange('c', num)}
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
            onChangeText={num=>handleValueChange('A', num)}
            keyboardType='numeric'
            value={triangle.angles.A}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>B</Text>
          <TextInput 
            onChangeText={num=>handleValueChange('B', num)}
            keyboardType='numeric'
            value={triangle.angles.B}
            style={styles.input}
          />
        </View>

        <View style={styles.inputField}>
          <Text style={styles.label}>C</Text>
          <TextInput 
            onChangeText={num=>handleValueChange('C', num)}
            keyboardType='numeric'
            value={triangle.angles.C}
            style={styles.input}
          />
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  inputsWrapper: {
    flex: 1,
  },
  header3: {
    fontFamily: 'DkCrayon',
    fontSize: 26,
    margin: 5,
    color: 'white',
    alignSelf: 'center'
  },
  inputField: {
    flexDirection: "row",
    justifyContent: 'space-between',    
    margin: 5,
    padding: 3,
    maxWidth: 125
  },
  label: {
    fontFamily: 'DkCrayon',
    color: 'white',
    fontSize: 20,
    margin: 2,
  },
  input: {
    fontSize: 20,
    fontFamily: 'DkCrayon',
    textAlign: "right",
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingRight: 10,
    width: '100%'
  }
});

export default Inputs