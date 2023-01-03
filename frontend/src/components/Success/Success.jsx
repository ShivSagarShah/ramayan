

import './Success.css';


import { Link} from "react-router-dom";


import Button from 'react-bootstrap/Button';

function Success() {
    return (
      <div className="success">
        <div className="success-container">
            <div className='success-text secondary-color'>
                <h1>CHECK IN SUCCESSFUL</h1>
                <h3>Go back for another Registration</h3>
            </div>
            
                <footer className='SearchPage-footer'>
                    <Link to="/search" ><Button  >BACK</Button></Link>
                </footer>
        </div>
        
      </div>
    );
  }
  
  export default Success;
  