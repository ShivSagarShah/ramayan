
import Logo from '../../utils/logo.png';
import "./Login.css";
import { useContext, useState } from 'react';
import config from '../../Config/config.json';
import Store from "../../Store/store";
import axios from "axios";
import { Navigate} from "react-router-dom";


function Login() {
  const{ state, dispatch } = useContext(Store);
  const [data, setData] = useState({
    'loginId': '',
    'password':''
  });
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState(0);

  const handleChange=(event) =>{
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const verify = async() => {
    const postData = {
      username: data.loginId,
      password: data.password
    };
    
    try{
      const response = await axios.post(`${config.BASE}/api/token/` , postData);
      if(response.data){
        console.log(response.data)
        localStorage.setItem('Bearer', `${response.data.access}`);
       
        dispatch({
            type: 'ONBOARD',
            payload: response.data.access
        });
      }

    }catch(error){
      console.log(error);
      setLoading(false);
    }

  }

  const handleLogin=(e)=>{
    e.preventDefault();
    console.log(e);
    if(data.loginId!==""||data.password!==""){
      setLoading(true);
      verify();
      // dispatch({
      //   type: 'ONBOARD',
      //   payload: "dada"
      // });
      console.log(state);
    }else{
      setError(1);
    }
  };

  if(state.isAuth){
    return <Navigate to='/search' />;
  }
  
  return (
    <div className="login">
      <header className="login-header">
        <div className="login-container">
            <header className="login-image">
                <img height="60" src={Logo}></img> 
            </header>
            <header>
                <div className="login-heading">
                    <h3 className="heading white-text">Let's decode</h3>
                    <h3 className="heading white-text">RAMAYANA</h3>
                </div>
            </header>
        </div>
      </header>
      <header className='login-input-container'>
        <div className='login-input-containers'>
        <input 
          className='login-input' 
          type="text" 
          name="loginId"
          placeholder="Enter LOGIN ID"
          onChange={handleChange}
          value={data.loginId}
          id="input-login-id"
        />
        </div>
        <div className='login-input-containers'>
        <input 
          className='login-input' 
          type="text" 
          name="password"
          placeholder="Enter PASSWORD"
          onChange={handleChange}
          value={data.password}
          id="input-login-id"
        />
        </div>
        <div className="login-error">
          {error===1 && <p>Enter valid login ID and password.</p>}
        </div>
        <div className='login-input-containers'>
        <button className='login-input login-button'  onClick={handleLogin} name="action"><p className='login-text'>LOGIN</p></button>
        </div>
      </header>
    </div>
  );
}

export default Login;
