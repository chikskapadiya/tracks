import '../_MockLocation';
import React,{useContext,useCallback} from 'react';
import {View,StyleSheet} from 'react-native';
import {Text } from 'react-native-elements';
import {SafeAreaView, withNavigationFocus  } from 'react-navigation';
import Map from '../components/Map';
import {Context as LoactionContext} from '../context/LoactionContext';
import useLocation from '../hooks/useLocation';
import TrackFrom from '../components/TrackFrom';
import { LinearGradient } from 'expo-linear-gradient';
const TrackCreateScreen =({isFocused})=>{
    // console.log(isFocused);
   
    const {state:{recording},addLoction}=useContext(LoactionContext);
    
    const callback=useCallback(locations => {
        addLoction(locations, recording);
      },[   recording]);

    const [err] = useLocation(isFocused || recording,callback);
    return (
        <SafeAreaView forceInset={{top:'always'}} style={{flex:1,backgroundColor:'#fff'}}>
              <LinearGradient
        colors={['#c7ecee', 'white']}
        style={styles.background}
        start={{ x: 0.9, y: 0.6 }}
        end={{ x: 0.9, y: 1 }}
      />
            <Text h3>Create a Track</Text>
            <Map /> 
            {err ? <Text>Please enable loaction services</Text>:null}
            <TrackFrom />
        </SafeAreaView>
        );
};
const styles=StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
      },

});

export default withNavigationFocus(TrackCreateScreen);