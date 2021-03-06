import {AsyncStorage} from '@react-native-community/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authreducer =(state,action)=>{
    switch(action.type){
        case 'add_error':
            return {...state, errorMessage:action.payload};
        case 'signin' :
            return{errorMessage:'',token:action.payload};
        case 'signup' :
            return{errorMessage:'',token:action.payload};
        case 'clear_error_message':
            return { ...state, errorMessage: '' };
        case 'signout':
            return { token: null, errorMessage: '' };
        default :
          return state;
    }
};
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' });
  };

const tryLocalSignin = dispatch => async ({callback}) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      dispatch({ type: 'signin', payload: token });
      callback();
    } else {
      callback();
    }
  };
const Signup=(dispatch)=> async({email,password,callback})=>{
     try{
         const  response=await trackerApi.post('/signup',{email,password});
         await AsyncStorage.setItem('token',response.data.token);
         dispatch({type:'signup' ,payload:response.data.token});
        callback();
     } catch (err) {
        dispatch({type:'add_error',payload:'Something went wrong with sign up'})
     }
    };

const Signin =(dispatch)=>async({email,password,callback})=>{
    try{
        const  response=await trackerApi.post('/signin',{email,password});
         await AsyncStorage.setItem('token',response.data.token);
         dispatch({type:'signin' ,payload:response.data.token});
         callback();
    } catch (err) {
       dispatch({type:'add_error',payload:'Something went wrong with sign up'})
    }

    };

const Signout=(dispatch)=>{
    return async()=>{
        await AsyncStorage.removeItem('token');
        dispatch({ type: 'signout' });
        navigate('SignupScreen');
    };
};

export const { Provider,Context}=createDataContext(
    authreducer,
    {Signin,Signup,Signout,clearErrorMessage, tryLocalSignin },
    {token:null, errorMessage: ' '},
);