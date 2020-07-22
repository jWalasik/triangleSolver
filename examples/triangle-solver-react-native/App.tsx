import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button, Image, ImageBackground } from 'react-native';
import TriangleSolver from 'triangle-solver';
import TriangleCanvas from './components/TriangleCanvas';
import Inputs from './components/Inputs';

const defaults = {
  a:5, b:5, c:5,
  A:60, B:60, C:60
}
const triangle = new TriangleSolver(defaults)

export default function App() {
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
    <ImageBackground source={require('./assets/blackboard.png')} style={styles.container} >
        <ScrollView >
        <Text style={styles.header1}>triangleSolver</Text>
        <Text style={styles.status}>{triangle.status}</Text>

        <TriangleCanvas triangle={triangle} />
        <Inputs triangle={triangle} handleValueChange={handleValueChange} />

        <View style={styles.button}>
          <Button 
            onPress={solveTriangle}
            title="Solve"
            color="black"
            accessibilityLabel="Compute unknown sides and angles of triangle"
          />
        </View>
      </ScrollView>
    </ImageBackground>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(48, 47, 47)',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  header1: {
    marginTop: 30,
    fontSize: 30,
    color: 'white'
  },
  status: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white'
  },
  button: {
    // width: '100%',
    // maxWidth: 250,
    // padding: 5,
    // backgroundColor: 'transparent',
    // borderRadius: 10,
    // fontSize: 20,
    // margin: 20,
    // color: 'white'
  }
});
