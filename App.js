import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';

TouchableOpacity.activeOpacity = 1;

const BALLS = ['A', 'B', 'C'];
const BALL_SIZE = Dimensions.get('window').width / 2 - 60;

const Ball = ({ball, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={() => onPress(ball)}
    style={{
      height: BALL_SIZE,
      width: BALL_SIZE,
      borderRadius: BALL_SIZE / 2,
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10
    }}>
    <Text style={{fontSize: 30, color: 'white'}}>{ball}</Text>
  </TouchableOpacity>
);

const Area = ({backgroundColor, onAreaPress, balls, onBallPress}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onAreaPress}
    style={{
      backgroundColor,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {balls.map((ball) => (
      <Ball ball={ball} onPress={onBallPress} />
    ))}
  </TouchableOpacity>
);

const ClickDrop = (props) => {
  const [areaABalls, setAreaABalls] = useState(BALLS);
  const [areaBBalls, setAreaBBalls] = useState([]);
  const [activeBall, setActiveBall] = useState(null);

  const handleAreaPress = (area) => () => {
    if (activeBall) {
      let newABalls = areaABalls;
      let newBBalls = areaBBalls;
      if (area === 'A' && !areaABalls.includes(activeBall)) {
        newABalls = [...areaABalls, activeBall];
        newBBalls = areaBBalls.filter((ball) => ball !== activeBall);
      } else if (area === 'B' && !areaBBalls.includes(activeBall)) {
        newBBalls = [...areaBBalls, activeBall];
        newABalls = areaABalls.filter((ball) => ball !== activeBall);
      }
      setAreaABalls(newABalls);
      setAreaBBalls(newBBalls);
      setActiveBall(null);
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <Area
        backgroundColor={'dodgerblue'}
        balls={areaABalls}
        onAreaPress={handleAreaPress('A')}
        onBallPress={setActiveBall}
      />
      <Area
        backgroundColor={'orange'}
        balls={areaBBalls}
        onAreaPress={handleAreaPress('B')}
        onBallPress={setActiveBall}
      />
    </View>
  );
};

export default ClickDrop;
