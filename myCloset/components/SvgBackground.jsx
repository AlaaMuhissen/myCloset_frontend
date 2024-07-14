import React, { useEffect } from 'react';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { useSharedValue, useAnimatedProps, withRepeat, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);

const SvgBackground = () => {
  const offset = useSharedValue(0);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(1, { duration: 3000 }),
      -1,
      true
    );
  }, []);

  const animatedProps1 = useAnimatedProps(() => {
    return {
      transform: [{ translateY: offset.value * 10 }]
    };
  });

  const animatedProps2 = useAnimatedProps(() => {
    return {
      transform: [{ translateY: -offset.value * 10 }]
    };
  });

  return (
    <Svg style={styles.svgBackground} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
      <Defs>
        <LinearGradient id='a' x1='0' x2='0' y1='1' y2='0' gradientTransform='rotate(0,0.5,0.5)'>
          <Stop offset='0' stopColor='#0FF' />
          <Stop offset='1' stopColor='#CF6' />
        </LinearGradient>
        <LinearGradient id='b' x1='0' x2='0' y1='0' y2='1' gradientTransform='rotate(108,0.5,0.5)'>
          <Stop offset='0' stopColor='#F00' />
          <Stop offset='1' stopColor='#FC0' />
        </LinearGradient>
      </Defs>
      <G fill='#FFF' fillOpacity='0' strokeMiterlimit='10'>
        <G stroke='url(#a)' strokeWidth='9.24'>
          <AnimatedPath
            animatedProps={animatedProps1}
            d='M1409 581 1450.35 511 1490 581z'
            transform='translate(-134.4 26.8) rotate(15.7 1409 581) scale(1.051446)'
          />
          <Circle
            strokeWidth='3.08'
            transform='translate(-91.5 81) rotate(20.8 800 450) scale(1.0338889999999998)'
            cx='500'
            cy='100'
            r='40'
          />
          <Path
            transform='translate(61.7 -211.5) rotate(204.5 401 736) scale(1.0338889999999998)'
            d='M400.86 735.5h-83.73c0-23.12 18.74-41.87 41.87-41.87S400.86 712.38 400.86 735.5z'
          />
        </G>
        <G stroke='url(#b)' strokeWidth='2.8'>
          <AnimatedPath
            animatedProps={animatedProps2}
            d='M149.8 345.2 118.4 389.8 149.8 434.4 181.2 389.8z'
            transform='translate(486 -25.4) rotate(6.35 150 345) scale(0.9324819999999999)'
          />
          <Rect
            strokeWidth='6.16'
            transform='translate(-285.5 -206) rotate(241.2 1089 759)'
            x='1039'
            y='709'
            width='100'
            height='100'
          />
          <Path
            transform='translate(-446.8 145.2) rotate(40.2 1400 132) scale(0.965)'
            d='M1426.8 132.4 1405.7 168.8 1363.7 168.8 1342.7 132.4 1363.7 96 1405.7 96z'
          />
        </G>
      </G>
    </Svg>
  );
};
const styles = StyleSheet.create({
  
    svgBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1, // Ensure the background is behind other elements
    },
});

export default SvgBackground;
