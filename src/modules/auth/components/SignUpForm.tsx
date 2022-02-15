import React from 'react';
import {useState} from 'react';
import { FormattedMessage } from 'react-intl';
import {ILocationParams,ISignUpParams,IGenderParams} from '../../../models/auth';
import {validateSignUp,validSignUp} from '../utils';
import { RESPONSE_STATUS_SUCCESS } from '../../../utils/httpResponseCode'
import {fetchThunk} from '../../common/redux/thunk';
import { Action } from 'redux';
import { AppState } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import {API_PATHS} from '../../../configs/api';


interface Props {
    onSignUp(values: ISignUpParams) : void;
    errorMessage : string;
    loading : boolean;
    locations : Array<ILocationParams>;
    states : Array<ILocationParams>;
    getStates (pid: string) : void
}

const SignUpForm = (props : Props) =>{
    const {onSignUp,errorMessage,loading,locations,states,getStates} = props;
    const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
    const [formValues,setFormValues] = React.useState<ISignUpParams>({ email : '', password :'',repeatPassword : '',name :'',gender : '',region :'',state : ''});
    const [validate,setValidate] = React.useState<ISignUpParams>();
    
    
    const onSubmit = ()=>{
        const validate = validateSignUp(formValues);
        setValidate(validate);
        if(!validSignUp(validate)) {
            console.log(validSignUp(validate))
            return; 
        }
            onSignUp(formValues)
        
    }

    
    const GENDER = [
        {
            "label" : "male",
            "value" : "male"
        },
        {
            "label" : "female",
            "value" : "female"
        }
    ]

    const renderGender =() =>{
        const arrGender : JSX.Element[] = [
            <option disabled selected value={''} key={''}>
                {''} -- select an option -- {''}
            </option>
        ];
        GENDER.map((g : IGenderParams ,index : number) =>{
            arrGender.push (
                <option value= {g.value} key={index}> 
                    {g.label}
                </option>
            );
        });
        return arrGender;
    };

    const renderRegion = () =>{
        const arrRegion : JSX.Element[] = [
            <option disabled selected value={''} key ={''}>
                {''} -- select an option -- {''}
            </option>
        ];
        locations.map((l : ILocationParams,index : number)=>{
            arrRegion.push(
                <option value={l.id} key={index}>
                    {l.name}
                </option>
            );
        }) ;
        return arrRegion;
    };

    const renderState = () =>{
        const arrState :  JSX.Element[] = [
            <option disabled selected value= {''} key={''}>
                {''} -- selected an option -- {''}
            </option>
        ];

        
        states.map((state : ILocationParams,index : number)=>{

            arrState.push(
                <option value={state.id} key={index}>
                    {state.name}
                </option>
            );
        }) ;
        return arrState;
    };

    return(<form
        autoComplete = "off"
        style={{ maxWidth: '560px', width: '100%',paddingTop :'50px'}}
        noValidate
        className ="row g-3 needs-validation"
        onSubmit = {(e) =>{
            e.preventDefault();
            onSubmit()
}}
    >
        {
        !!errorMessage &&(<div className='alert alert-danger' role ="alert" style={{width : '100%'}}>
            {errorMessage}
        </div>)
        }

        <div className='col-md-12'>
            <label className ="form-label">
                <FormattedMessage id="email" />
            </label>
            <input className ="form-control"
                   type = "email"
                   value= {formValues.email}
                   id="SignUpEmail"
                   onChange = {(e) =>{
                       setFormValues({...formValues,email : e.target.value})
                   }}
            >
            </input>

            {!!validate?.email && (
                <small className='text-danger'>
                    <FormattedMessage id={validate?.email} />
                </small>
            )}

        </div>

        <div className='col-md-12'>
            <label className ="form-label">
                <FormattedMessage id="password" />
            </label>
            <input className ="form-control"
                   type = "password"
                   value= {formValues.password}
                   id="SignUpPassword"
                   onChange = {(e) =>{
                       setFormValues({...formValues,password : e.target.value})
                   }}
            >
            </input>

            {!!validate?.password && (
                <small className='text-danger'>
                    <FormattedMessage id={validate?.password} />
                </small>
            )}
        </div>

        <div className='col-md-12'>
            <label className ="form-label">
                <FormattedMessage id="repeatPassword" />
            </label>
            <input className ="form-control"
                   type = "password"
                   value= {formValues.repeatPassword}
                   id="SignUpRepeatPassword"
                   onChange = {(e) =>{
                       setFormValues({...formValues,repeatPassword : e.target.value})
                   }}
            >
            </input>

            {!!validate?.repeatPassword && (
                <small className='text-danger'>
                    <FormattedMessage id={validate?.repeatPassword} />
                </small>
            )}

        </div>

        <div className='col-md-12'>
            <label className ="form-label">
                <FormattedMessage id="name" />
            </label>
            <input className ="form-control"
                   type = "text"
                   value= {formValues.name}
                   id="SignUpName"
                   onChange = {(e) =>{
                       setFormValues({...formValues,name : e.target.value})
                   }}
            >
            </input>

            {!!validate?.name && (
                <small className='text-danger'>
                    <FormattedMessage id={validate?.name} />
                </small>
            )}

        </div>

        <div className='col-md-12'>
            <label className ="form-label">
                <FormattedMessage id="gender" />
            </label>
            <select className ="form-control"
                   value= {formValues.gender}
                   id="SignUpGender"
                   onChange = {(e) =>{
                       setFormValues({...formValues,gender : e.target.value})
                   }}
            >
                {renderGender()}
            </select>

            {!!validate?.gender && (
                <small className='text-danger'>
                    <FormattedMessage id={validate?.gender} />
                </small>
            )}
        </div>

        <div className='col-md-12'>
            <label className ="form-label">
                <FormattedMessage id="region" />
            </label>
            <select className ="form-control"
                   value= {formValues.region}
                   id="SignUpRegion"
                   onChange = {(e) =>{
                       setFormValues({...formValues,region : e.target.value})
                       getStates(e.target.value)
                   }}
            >
                {renderRegion()}
            </select>
            
            {!!validate?.region && (
                <small className='text-danger'>
                    <FormattedMessage id={validate?.region} />
                </small>
            )}

        </div>

        {formValues.region? (
        <div className='col-md-12'>
            <label className ="form-label">
                <FormattedMessage id="state" />
            </label>
            <select className ="form-control"
                   value= {formValues.state}
                   id="SignUpState"
                   onChange = {(e) =>{
                       setFormValues({...formValues,state : e.target.value})
                   }}
            >
                {renderState()}
            </select>

            {!!validate?.state && (
                <small className='text-danger'>
                    <FormattedMessage id={validate?.state} />
                </small>
            )}
        </div>
        ) : null}


       <div className="row justify-content-md-center" style={{ margin: '16px 0' }}>
        <div className="col-md-auto">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ minWidth: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            disabled={loading}
          >
         
            {loading && <div className="spinner-border spinner-border-sm text-light mr-2" role="status" />}
            <FormattedMessage id="register" />
            </button>
        </div>
      </div>
    </form>);
};

export default SignUpForm