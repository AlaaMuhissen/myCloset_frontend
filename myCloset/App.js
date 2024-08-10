// import React, { useState, useEffect } from 'react';
// import './config/firebase';
// import * as SplashScreen from 'expo-splash-screen';
// import * as Font from 'expo-font';
// import RootNavigation from './navigation/RootNavigation';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// SplashScreen.preventAutoHideAsync();

// const fetchFonts = () => {
//   return Font.loadAsync({
//     'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
//     'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
//     'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
//   });
// };

// export default function App() {
//   const [fontLoaded, setFontLoaded] = useState(false);

//   useEffect(() => {
//     const loadResources = async () => {
//       try {
//         await fetchFonts();
//       } catch (err) {
//         // console.error(err);
//       } finally {
//         setFontLoaded(true);
//         await SplashScreen.hideAsync();
//       }
//     };

//     loadResources();
//   }, []);

//   if (!fontLoaded) {
//     return null;
//   }

//   return <RootNavigation />;
// }

import "expo-router/entry";
