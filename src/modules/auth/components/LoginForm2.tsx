import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validateLogin, validLogin } from '../utils';

interface Props {
    errorMessage: string;
    onLogin(values: ILoginParams): void;
}
const LoginForm2 = (props : Props)=>{

    const { errorMessage ,onLogin} = props;
    const [formValues, setFormValues] = React.useState<ILoginParams>({ email: '', password: '', rememberMe: false });
    const [validate, setValidate] = React.useState<ILoginValidation>();

    const onSubmit = React.useCallback(() => {
        const validate = validateLogin(formValues);
    
        setValidate(validate);
    
        if (!validLogin(validate)) {
          return;
        }
    
        onLogin(formValues);
    }, [formValues, onLogin]);
    return (<form style={{maxWidth :'600px',alignItems:'center',width:'100%'}}
                  noValidate
                  className="row g-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit();
                  }}
    >
        {!!errorMessage && (
        <div className="alert alert-danger" role="alert" style={{ width: '100%' }}>
          {errorMessage}
        </div>
        )}


        <div className="col-md-12">
            <label className="form-label">nhập email:</label>
            <input type="text" 
                   value={formValues.email}
                   onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                   className="form-control"></input>
        </div>
        {!!validate?.email && (
          <small className="text-danger">
            <FormattedMessage id={validate?.email} />
          </small>
        )}


        <div className="col-md-12">
            <label className="form-label">nhập mật khẩu:</label>
            <input type="text"
                   value={formValues.password} 
                    onChange ={(e)=>setFormValues({...formValues,password : e.target.value})}
                   className='form-control'></input>
        </div>
        {!!validate?.password && (
          <small className="text-danger">
            <FormattedMessage id={validate?.password} />
          </small>
        )}
        

        <button className="btn-danger"
                style={{width : '100px' ,marginLeft: '250px',borderRadius :'5px'}}
        >login</button>
    </form>);

};
export default LoginForm2;