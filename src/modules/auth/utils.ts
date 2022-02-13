import { ILoginParams, ILoginValidation } from '../../models/auth';
import { validEmailRegex } from '../../utils';
import {ISignUpParams} from '../../models/auth';

const validateEmail = (email: string) => {
  if (!email) {
    return 'emailRequire';
  }

  if (!validEmailRegex.test(email)) {
    return 'emailInvalid';
  }

  return '';
};

const validatePassword = (password: string) => {
  if (!password) {
    return 'passwordRequire';
  }

  if (password.length < 4) {
    return 'minPasswordInvalid';
  }

  return '';
};
const validateRepeatPassword = (password : string,repeatPassword :string) =>{
  if(!repeatPassword) {
    return "passwordRequire";
  }

  if (password !== repeatPassword) {
    return "matchPasswordInvalid";
  }

  return "";
}
const validateField = (field : string,value :string) =>{
  if(value) return '';
  let fieldRequire = '';
  switch(field) {
    case 'name' :
      fieldRequire = 'nameRequire';
      break;

    case 'gender' :
      fieldRequire = 'genderRequire';
      break;

    case 'region' :
      fieldRequire = 'regionRequire';
      break;

    case 'state' :
      fieldRequire = 'stateRequire';
      break;
  }
    return fieldRequire;
}

export const validateLogin = (values: ILoginParams): ILoginValidation => {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
};

export const validLogin = (values: ILoginValidation) => {
  return !values.email && !values.password;
};

export const validateSignUp = (values: ISignUpParams) : ISignUpParams =>{
  return {
    email : validateEmail(values.email),
    password : validatePassword(values.password),
    repeatPassword : validateRepeatPassword(values.password,values.repeatPassword),
    name: validateField('name',values.name),
    gender: validateField('gender',values.gender),
    region: validateField('region',values.region),
    state: validateField('state',values.state),
  };
};

export const validSignUp = (values : ISignUpParams) =>{
  return !values.email && !values.password && !values.name && !values.repeatPassword && !values.gender && !values.region && !values.state;

}
