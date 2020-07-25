import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font'
import TriangleSolver from 'triangle-solver';
import TriangleCanvas from './components/TriangleCanvas';
import Inputs from './components/Inputs';

const defaults = {
  a:5, b:5, c:5,
  A:60, B:60, C:60
}
const triangle = new TriangleSolver(defaults)

export default function App() {
  const [loaded, error] = Font.useFonts({
    DkCrayon: require('./assets/DkCrayonCrumble-ddll.ttf')
  }) 

  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    setUpdate(false);
    
  }, [update]);

  const handleValueChange = (id: string, value: number) => {
    triangle.update(id, value);
    triangle.validateInput();
    setUpdate(true);
  };

  const solveTriangle = () => {
    triangle.solve()
      .then(()=>setUpdate(true))
      .catch(err=>alert(err))
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/blackboard.png')} style={styles.background}>
        <Text style={styles.header1}>triangleSolver</Text>
        <Text style={styles.status}>{triangle.status}</Text>
        <TriangleCanvas triangle={triangle} />
        <Inputs triangle={triangle} handleValueChange={handleValueChange} />

        <Button 
          onPress={solveTriangle}
          title="Solve"
          color="gray"
          accessibilityLabel="Compute unknown sides and angles of triangle"
        />
      </ImageBackground> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  background: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch',
    marginTop: 20,
    padding: 5
  },
  header1: {
    color: 'white',
    fontSize: 35,
    fontFamily: 'DkCrayon',
    alignSelf: 'center'
  },
  status: {
    fontFamily: 'DkCrayon',
    color: 'white',
    fontSize: 26,
    textAlign: 'center'
  }
});
