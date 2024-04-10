
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const getIconComponent = (iconString, size, color) => {
  return <FontAwesome5 name={iconString} size={size} color={color} />;
};
