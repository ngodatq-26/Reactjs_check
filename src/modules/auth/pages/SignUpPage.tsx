import React from 'react';
import logo from '../../../logo-420-x-108.png';
import { useDispatch } from 'react-redux';
import { useEffect} from 'react';
import { AppState } from '../../../redux/reducer';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import {useState} from 'react';
import {ISignUpParams} from '../../../models/auth';
import {fetchThunk} from '../../common/redux/thunk';
import {API_PATHS} from '../../../configs/api';
import {RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode';
import { ROUTES } from '../../../configs/routes';
import SignUpForm from '../components/SignUpForm';
import { replace } from 'connected-react-router';
import { getErrorMessageResponse } from '../../../utils';


const SignUpPage = ()=>{
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [loading,setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [locations,setLocations] = useState([]);
    
    const [states,setStates] = React.useState([]);

    
    const getStates = React.useCallback(async(pid : string)=>{
        const json = await dispatch(fetchThunk(API_PATHS.getLocation + `?pid=${pid}` ,'get'));
        if(json?.code === RESPONSE_STATUS_SUCCESS) {
            setStates(json.data);
            return ;
        }
    },[]);

    const getLocations = React.useCallback(async()=>{
        setLoading(true);

        const json = await dispatch(fetchThunk(API_PATHS.getLocation,'get'));

        setLoading(false);

        if(json?.code === RESPONSE_STATUS_SUCCESS ) {
            setLocations(json.data);
            return;
        }
    },[]);

    useEffect(()=>{
        getLocations();
    },[getLocations])

    const onSignUp = React.useCallback(async(values: ISignUpParams)=>{
        setErrorMessage('');
        setLoading(true);
        const json = await dispatch(

            fetchThunk(API_PATHS.signUP,'post',values)
        );
        
        
        setLoading(false);

        if(json?.code != RESPONSE_STATUS_SUCCESS ) {
            setErrorMessage(getErrorMessageResponse(json));
            return false ;
        }  else {
            console.log(json.data);
            alert('chúc mừng bạn đã đăng ký thành công!!!');
            dispatch(replace(ROUTES.login));
            return true;
        }  
    },[dispatch]);

    return (
        <div
            className ="container"
            style = {{height : '100vh',
                      display : 'flex',
                      alignItems : 'center',
                      justifyContent : 'center',
                      flexDirection : 'column',                
        }}
        >
            <img src={logo} style={{maxWidth :'250px', margin :'32px'}} />
            <SignUpForm onSignUp ={onSignUp} errorMessage ={errorMessage} loading ={loading} locations={locations} states={states} getStates = {getStates}  />
        </div>
    );
}
export default SignUpPage;