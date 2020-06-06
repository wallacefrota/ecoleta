import React from 'react';
import { StatusBar } from 'react-native';

// importing routes
import Routes from './src/routes';

export default function App() {
  return (
    <>
     <StatusBar barStyle="light-content" backgroundColor="#000" translucent/>
     <Routes />
    </>
  );
}