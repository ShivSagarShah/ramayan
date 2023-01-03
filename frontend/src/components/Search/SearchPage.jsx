
import { Link } from 'react-router-dom';
import Logo from '../../utils/logo.png';
import "./SearchPage.css";
import Store from "../../Store/store";
import Button from 'react-bootstrap/Button';

import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import axios from "axios";
import config from "../../Config/config.json";

import { useContext, useState, useEffect } from 'react';

import { Navigate} from "react-router-dom";

import Modal from 'react-bootstrap/Modal';


function SearchPage() {

  const{ state, dispatch } = useContext(Store);
  const[allVisitors, setAllVisitors] = useState([]);
  const[originalVisitorList, setOriginalVisitorList] = useState([
    
  ]);

  const[showCheckIn, setShowCheckIn] = useState(false);
  const[RID, setRID] = useState();
  const[singlePersonData, setSinglePersonData] = useState();
  const[checkInFirstStage, setCheckInFirstStage] = useState(false);
  const[searchText, setSearchText] = useState();
  const[filter, setFilter] = useState(0);
  const[success, setSuccess] = useState(0);
  const[searchedData, setSearchedData] = useState([
    
  ]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const filterConstants = ["registration_id", "name", "phone"]

    
    useEffect(() => {


		const getDetails = async () => {
            console.log(config);
			try {
				const res = await axios({
					url: config.BASE + `/api/visitor/`,
					method: "GET",
					headers: {
						Authorization: `Bearer ${localStorage.Bearer}`,
					}
				});
                console.log(res.data.data);
                if(res.data){
                    setAllVisitors(res.data?.data);
				    setOriginalVisitorList(res.data?.data);
                    setSearchedData(res.data?.data);
                    console.log(searchedData);
                }
				
			}
			catch (err) {
				console.log(err.response)
				// if(err.response === undefined )
				// {
				// 	// console.log("Please try Again");
				// 	// setError(1);
				// }
				// else if (err && err.response.status === 401) {
                //     // seterror(1);
                // } else {
                //     // seterror(0);
                // }
				
			}
		}
		getDetails();
	}, [])

    // const handleChange=(event) =>{
    //     setSearchText(event.target.value);
    // };

    const handleLogout = (event) => {
        dispatch({
            type: 'LOGOUT'
        });
    }

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("in search", searchText, e.target.value);

        setSearchText(e.target.value.trim());
        searchQuery(e.target.value.trim());
    }

    const handleValueChange=(e) =>{
        console.log(e);
        setFilter(e);
    }

    const searchQuery = (searchText) => {
        console.log("inSearchQuery");
        const filterValue = filterConstants[filter];
        const filteredList = [];
        const visitorList = [...originalVisitorList];
        visitorList.forEach((singleVisitor, key) => {

            if(filterValue==="name" &&singleVisitor[filterValue]?.toLowerCase().includes(searchText.toLowerCase())){
                console.log(originalVisitorList[key].name, singleVisitor.registration_id, key);
                filteredList.push(originalVisitorList[key]);
            }
            else if(filterValue==="phone" &&singleVisitor[filterValue]?.includes(searchText)){
            
                console.log(originalVisitorList[key].name, singleVisitor.registration_id, key);
                filteredList.push(originalVisitorList[key]);
            }else if(filterValue==="registration_id" &&singleVisitor[filterValue].toString()?.includes(searchText.toString())){
                filteredList.push(originalVisitorList[key]);
            }
        })
        setSearchedData(filteredList);
        console.log(filteredList);
    }


    // const handleSearchSubmit=(e)=>{
    //     e.preventDefault();
    //     // if(searchText.trim()!=="")
    //         // searchQuery();
    // }

    const handleSinglePersonData=(e, data, key)=>{
        setShowCheckIn(true);
        const e1 = document.getElementById(`singlePerson`+singlePersonData);
        if(e1)
            e1.style.backgroundColor="#00000000";
        console.log( data);
        setSinglePersonData(key);
        const e2 = document.getElementById(`singlePerson`+key);
        e2.style.backgroundColor="#0000004a";
    }

   

    const handleCheckIn =(e, data,key) =>{
        setCheckInFirstStage(true);
        handleShow();
        const checkInData = {
            registration_id: data.registration_id
        }
        setRID(checkInData.registration_id);
    }

    console.log(searchedData);

    const handleCheckInBackend  = async(RID) => {
        const postData = {
            "registrationId": RID
        };

        let formData = new FormData();    //formdata object

        formData.append('registration_id', RID); 
        // /api/visitor/checkin/
        try{
            const response = await axios({
                url: `${config.BASE}/api/visitor/checkin/` , 
                data: formData,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.Bearer}`,
                }
            });

            if(response.data){
                console.log(response.data)
                if(response.data.status==="Success"){
                    setSuccess(1);
                }else{
                    setSuccess(2);
                }
                //send user to success screen
            }
      
        }catch(error){
            console.log(error);
            // setLoading(false);
        }

    }

    const handleSubmitCheckIn = () => {
        console.log(RID);
        handleClose();
        if(RID!=="")
            handleCheckInBackend(RID);
    }

    if(success===1){
        return <Navigate to='/success' />;
    }
    if(success===2){
        return <Navigate to='/alreadyCheckin' />;
    }
    

    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
            <div className='SearchPage-header'>
                <div className="SearchPage-head">
                    <header className="SearchPage-image">
                        <img height="60" src={Logo}></img> 
                    </header>
                    <header className='SearchPage-heading'>
                        <div className="SearchPage-heading">
                            <h3 className="heading white-text">
                                Let's decode
                            </h3>
                            <h3 className="heading white-text">
                                RAMAYANA
                            </h3>
                        </div>
                    </header>
                </div>
                
                <header className='SearchPage-logout'>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </header>
            </div>
            <div className="SearchPage-subHeading">
                <h2 className='secondary-color'>Guest Authentication</h2>
            </div>

            <div className="SearchPage-filters">
            <ToggleButtonGroup type="radio" onChange={handleValueChange} value={filter} name="options" >
                <ToggleButton  id="tbg-radio-1" value={0}>
                Registration Id
                </ToggleButton>
                <ToggleButton  id="tbg-radio-2" value={1}>
                Name
                </ToggleButton>
                <ToggleButton  id="tbg-radio-3" value={2}>
                Phone Number
                </ToggleButton>
            </ToggleButtonGroup>
                
            </div>
            <br/>
            <div className="SearchPage-searchBox">
                <input 
                    className='search-input' 
                    type="text" 
                    name="searchText"
                    placeholder="Enter Search Input"
                    onChange={handleSearch}
                    value={searchText}
                    id="input-login-id"
                />
                {/* <Button onClick={handleSearchSubmit} >
                    Search
                </Button> */}

            </div>
            <br/>
            {searchedData && searchedData.length>0?(
                <>
                    <h3 className='searchedData-heading secondary-color'>Visitors List :  {searchedData.length} </h3>

                    <br/>
                    
                    {searchedData.map((searchedDatalist, key)=>{
                        return(
                        <>

                            <div id={`singlePerson`+key} className='SinglePersonData' onClick={(e) =>handleSinglePersonData(e,searchedDatalist, key)}>
                                <hr className='hr-secondary' style={{marginTop:0}}></hr>
                                <div className='listContent' style={{marginLeft:"20px"}}>
                                    <div>
                                        <p className='secondary-color'>Name: {searchedDatalist.name}</p>
                                        <p className='secondary-color'>Phone: {searchedDatalist.phone}</p>
                                        <p className='secondary-color'>Email-id:{searchedDatalist.email}</p>
                                    </div>
                                    <div>
                                        <p className='secondary-color' style={{justifyContent:"center", display:"flex"}}>{searchedDatalist.registration_id}</p>
                                        <Button onClick={(e)=>handleCheckIn(e,searchedDatalist, key)}>CHECK-IN</Button>
                                    </div>
                                </div>
                                
                            </div>
                        </>
                    )})}
                    <hr className='hr-secondary' style={{marginTop:0}}></hr>
                    

                </>
                ):(<>
                    <h3 className='searchedData-heading secondary-color'>Sorry No Visitor Available with this search </h3>

                </>)
            }


            <>
                <footer className='SearchPage-footer'>
                    <Link to="/home"><Button onClick={handleCheckIn}>BACK</Button></Link>
                    {/* {showCheckIn===true&&(<Button onClick={handleCheckIn}>CHECK-IN</Button>)} */}
                </footer>
            </>

            {checkInFirstStage &&
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>CHECK IN Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please confirm the check in to welcome the guest.</Modal.Body>
                    <Modal.Body>Registration Id: {RID}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        DECLINE
                    </Button>
                    <Button variant="primary" onClick={handleSubmitCheckIn}>
                        CONFIRM 
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
            }
            
        </div>
        
      </div>
    );
  }
  
  export default SearchPage;
  