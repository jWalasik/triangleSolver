import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
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

  const handleValueChange = e => {
    const { id, value } = e.target;
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
      <Text style={styles.header1}>triangleSolver</Text>

      <TriangleCanvas triangle={triangle} />
      <Inputs triangle={triangle} handleValueChange={handleValueChange} />

      <Button 
        onPress={solveTriangle}
        title="Solve"
        color="black"
        accessibilityLabel="Compute unknown sides and angles of triangle"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header1: {
    fontSize: 20
  }
});
