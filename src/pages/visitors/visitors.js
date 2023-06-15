import { useRef, useState, useEffect } from "react";
import "./visitors.css";
import config from "../../config.json";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';

const Visitors = () => {

    //const auth = localStorage.getItem('token');

    const { event_id_params } = useParams()

    const { organization_id } = useParams()

    const [expoDetails, setExpoDetails] = useState([])

    useEffect(() => {
        axios.get(config.baseurl+'api/organizer/event/'+ event_id_params).then((res) => {
            console.log('event details ', res.data.data)
            setExpoDetails(res.data?.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    function dateFormatter(dateFrm){
        const dateObj = new Date(dateFrm);
        const formattedDate = dateObj.toLocaleDateString();
        return formattedDate
    }


    const navigate = useNavigate();

    const logout =()=> {
      localStorage.clear();
      navigate('/');
    }

    
    useEffect(() => { 
      axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      const auth = localStorage.getItem('token');
      if(auth == null){
        navigate('/');
      }
    }, [])


    const userRef = useRef();
    const errRef = useRef();


    const [errMsg, setErrMsg] = useState();
    const [event_id, setEventid] = useState("");
    const [name, setUsername] = useState("");
    const [phone_number, setPhonenumber] = useState("");
    const [email_address, setUseremail] = useState("");
    const [proof_type, setProoftype] = useState("");
    const [proof_no, setProofnumber] = useState("");
    const [location, setUserlocation] = useState("");
    const [humanType, setHumanType] = useState("")

    const [organization, setOrganization] = useState("")

    const handleprooftype = async (event) => {
        setProoftype(event.target.value);
    }
    
    const [password, setUerpassword] = useState("")

    const [toggle, setToggle] = useState(false)

    const [visitorsDetails, setVisitorsDetails] = useState([])

    const handleRegister = async () => {

        let orgDum
        if(organization != ""){
            orgDum = organization
        }else {
            orgDum = "Bu"
        }

        axios.post(config.baseurl+'api/visitors', {
            event_id: event_id_params,
            name: name,
            phone_number: phone_number,
            email_address: email_address,
            proof_type: proof_type,
            proof_no: proof_no,
            location: location,
            created_by: localStorage.getItem('user_id'),
            type: humanType,
            organization: organization,
        }).then((res) => {
            setToggle(!toggle)
            setVisitorsDetails(res.data.data)  
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleHumanType = async (data) => {
       setHumanType(data)
    }

    const logoutfun = () => {
        var answer = window.confirm("Confirm logout?");
        if (answer) {
            localStorage.clear()
            navigate('/')
        }
    }

    useEffect(() => {
        if(expoDetails != ""){
            if(visitorsDetails != ""){
                navigate('/visitor-registration/qr/'+visitorsDetails._id+'/'+visitorsDetails.name+'/'+visitorsDetails.organization+'/'+expoDetails.expo_name+'/'+expoDetails.expo_from_date+'/'+expoDetails.expo_to_date+'/'+expoDetails.venue+'/'+'TIME 11AM - 8PM')
            }
        }
    },[toggle])

    return (
        <>
            <main class="main-content  mt-0">
                <div class="page-header min-vh-100">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0 mx-auto">
                                <div class="card card-plain">
                                    <div class="card-header pb-0 text-start text-center">
                                        <span class="ms-1 font-weight-bold logintxtcl " >{expoDetails.expo_name + ' - ' + dateFormatter(expoDetails.expo_from_date) + ' ' + dateFormatter(expoDetails.expo_to_date)} </span>
                                    </div>
                                    <div class="card-body">
                                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                        <form role="form" >
                                            <div class="mb-3">
                                                <input type="hidden" class="form-control form-control-lg" placeholder="eventid" aria-label="eventid" value={event_id}
                                                    onChange={(e) => { setEventid(e.target.value); }} />
                                            </div>
                                            <div class="mb-3">
                                                <input type="text" class="form-control form-control-lg" placeholder="Name" aria-label="Name" value={name}
                                                    onChange={(e) => { setUsername(e.target.value); }} required />
                                            </div>
                                            <div class="mb-3">
                                                <input type="tel" class="form-control form-control-lg" placeholder="Phone Number" aria-label="Phone Number" value={phone_number}
                                                    onChange={(e) => { setPhonenumber(e.target.value); }} required />
                                            </div>
                                            <div class="mb-3">
                                                <input type="email" class="form-control form-control-lg" placeholder="Email" aria-label="Email" value={email_address}
                                                    onChange={(e) => { setUseremail(e.target.value); }} required />
                                            </div>
                                            <div class="mb-3">
                                                <select class="form-control" value={proof_type} onChange={(event) => handleprooftype(event)}>
                                                    <option value="adhar">Adhar ID</option>
                                                    <option value="voterid">Voter ID</option>
                                                    <option value="driving">Driving</option>
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <input type="tel" class="form-control form-control-lg" placeholder="Proof Number" aria-label="Proof Number" value={proof_no}
                                                    onChange={(e) => { setProofnumber(e.target.value); }} />
                                            </div>

                                            <div class="mb-3">
                                                <input type="tel" class="form-control form-control-lg" placeholder="Organization" aria-label="Organization" value={organization}
                                                    onChange={(e) => { setOrganization(e.target.value); }} />
                                            </div>

                                            <div class="mb-3">
                                                <select class="form-control" value={humanType} onChange={(e) => handleHumanType(e.target.value)}>
                                                    <option value="visitor">Visitor</option>
                                                    <option value="exhibitor">Exhibitor</option>
                                                    <option value="organizer">Organizer</option>
                                                </select>
                                            </div>

                                            <div class="mb-3">
                                                <input type="text" class="form-control form-control-lg" placeholder="Location" aria-label="Location" value={location}
                                                    onChange={(e) => { setUserlocation(e.target.value); }} required />
                                            </div>


                                            

                                            <div class="text-center">
                                                <button type="button" onClick={handleRegister} class="btn btn-lg btn-primary btn-lg w-100 mt-3 mb-0">Register</button>
                                            </div>

                                            <div class="text-center">
                                                <button type="button"onClick={() => navigate(-1)} class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Back to Home</button>
                                            </div>

                                            <button type="button" class="btn btn-secondary w-100 mt-3 mb-0" onClick={logoutfun}>Logout</button>
                                        </form>
                                    </div>
                                    <div class="card-footer text-center pt-0 px-lg-2 px-1">
                                        <p class="mb-4 text-sm mx-auto">

                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
                                <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden loginbgscreen" >
                                    <span class="mask bg-primary opacity-6"></span>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </main>
        </>
    )
}

export default Visitors;