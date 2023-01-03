
import { Link } from 'react-router-dom';
import Logo from '../../utils/logo.png';
import './Home.css';

import { useContext, useState } from 'react';
import Store from "../../Store/store";

function Home() {

  const{ state, dispatch } = useContext(Store);
    return (
      <div className="home">
        <div className="home-container">
            <header className="home-image">
                <img height="100" src={Logo}></img> 
            </header>
            <header>
                <div className="home-heading">
                    <h3 className="heading white-text">
                        Let's decode
                    </h3>
                    <h3 className="heading white-text">
                        RAMAYANA
                    </h3>
                </div>
            </header>
                <header>
                    {state.isAuth?(
                        <Link to="/search"><button className='login-input login-button' ><p className='login-text'>GO TO SEARCH</p></button></Link>
                
                    ):(
                        <Link to="/login"><button className='login-input login-button' ><p className='login-text'>LOGIN</p></button></Link>
                
                    )}
                </header>
        </div>
        
      </div>
    );
  }
  
  export default Home;
  