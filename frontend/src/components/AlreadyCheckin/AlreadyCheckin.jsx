
import { Link} from "react-router-dom";


import Button from 'react-bootstrap/Button';

function AlreadyCheckin() {
    return (
      <div className="success">
        <div className="success-container">
            <div className='success-text secondary-color'>
                <h1>ALREADY CHECKED IN </h1>
                <h3>Go back for another Registration</h3>
            </div>
            
                <footer className='SearchPage-footer'>
                    <Link to="/search" ><Button  >BACK</Button></Link>
                </footer>
        </div>
        
      </div>
    );
  }
  
  export default AlreadyCheckin;
  