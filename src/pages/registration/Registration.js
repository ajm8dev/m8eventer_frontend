import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./registaration.css";
import config from "../../config.json";
import { useState, useEffect } from "react";
import { useMatch, useNavigate } from 'react-router-dom';
import axios from "axios";

// React bootstrap imports
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Registration = () => {

    const [organizationData, setOrganizationData] = useState([])


    const [userName, setUserName] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('1234567890')
    const [address, setAddress] = useState('')
    const [createdBy, setCreatedBy] = useState('6377502a9c6ccc54d44e6c78')


    const [organization, setOrganization] = useState('bu')
    const [role, setRole] = useState('')
    const [type, setType] = useState('')
 
    const handleOrganization = async (event) => {
        setOrganization(event.target.value);
    }
    
    const handleRoleChange = async (event) => {
        setRole(event.target.value);
    }

    const handleTypeChange = async (event) => {
        setType(event.target.value);
    }

    //

    useEffect(() => {
        axios.get(config.baseurl + 'api/organization').then((res) => {
            console.log('organization data ', res.data.data[0].address)
            setOrganizationData(res.data.data)
        })
    }, [])

    //

    axios.post('api/user', {
        username: userName,
        emp_id: employeeId,
        country_code: countryCode,
        phone_number: phoneNumber,
        email: emailId,
        password: password,
        address: address,
        role:role,
        type:type,
        organization_id: organization,
        createdBy: createdBy
    }).then((res) => {
        alert(res.data.data)
    }).catch((err) => {
        alert(err)
    })

    //Modals

    const [registrationModal, setRegistrationModal] = useState(false)
    const handleCloseRegistrationModal = () => setRegistrationModal(false)

    //

    const handleSubmit = () => {
        console.log('hi')
    }


    return (
        <>
            <div class="min-height-300 bg-primary position-absolute w-100"></div>
            {/* <Sidebar /> */}
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-xl-12">
                            <button class="btn btn-primary" onClick={() => setRegistrationModal(true)}>Add user</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="card mb-4">
                                <div class="card-header pb-3">
                                    <div class="row">
                                        <div class="col-6 d-flex align-items-center">
                                            <h6 class="mb-0">Customers</h6>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body px-0 pt-0 pb-2">
                                    <div class="table-responsive p-3">
                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th class="text-secondary opacity-7 ps-2">S.No</th>
                                                    <th class="text-secondary opacity-7 ps-2">Details</th>
                                                    <th class="text-secondary opacity-7 ps-2">Address</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>user details</td>
                                                    <td>Action</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Modal show={registrationModal} onHide={handleCloseRegistrationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Register</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label for="user_name" class="form-label">username</label>
                                <input type="text" class="form-control" id="user_name" placeholder="" />
                            </div>
                            <div class="mb-3">
                                <label for="employee_id" class="form-label">employee id</label>
                                <input type="text" class="form-control" id="employee_id" placeholder="" />
                            </div>
                            <div class="mb-3">
                                <label for="country_code" class="form-label">country code</label>
                                <input type="text" class="form-control" id="country_code" placeholder="" />
                            </div>
                            <div class="mb-3">
                                <label for="phone_number" class="form-label">phone number</label>
                                <input type="text" class="form-control" id="phone_number" placeholder="" />
                            </div>

                            <div class="mb-3">
                                <label for="email_id" class="form-label">email id</label>
                                <input type="text" class="form-control" id="email_id" placeholder="" />
                            </div>

                        </div>
                        <div class="col-xl-6">

                            <div class="mb-3">
                                <label for="address" class="form-label">address</label>
                                <textarea type="text" rows={5} class="form-control" id="address" placeholder="" />
                            </div>

                            <div class="mb-3">
                                <label>Organization</label>
                                <select class="form-control" value={organization} onChange={(event) => handleOrganization(event)}>
                                    {/* <option value="">Choose an organization</option> */}
                                    {
                                        organizationData.map((data) => {
                                            return (
                                                <option value={data._id}>{data.organization_name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="role" class="form-label">role</label>
                                {/* <input type="text" class="form-control" id="role" placeholder="eg. admin | manager | marketer | security" /> */}

                                <select class="form-control" value={role} onChange={(event) => handleRoleChange(event)}>
                                    <option value="">select</option> 
                                    <option value="ADMIN">Admin</option>
                                    <option value="MANAGER">Manager</option>
                                    <option value="MARKETER">Marketer</option>
                                    <option value="SECURITY">Security</option>
                                </select>

                            </div>
                            <div class="mb-3">
                                <label for="type" class="form-label" onChange={(event) => handleTypeChange(event)}>type</label>
                                {/* <input type="text" class="form-control" id="type" placeholder="eg. exhibitor | organizer | visitor" /> */}    
                                <select class="form-control" value={type}>
                                    <option value="">select</option> 
                                    <option value="exhibitor">Exhibitor</option>
                                    <option value="organizer">Organizer</option>
                                    <option value="visitor">Visitor</option>
                                </select>
                            </div>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRegistrationModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={handleSubmit}>
                        Create user
                    </Button>
                    {/* <Button variant="success" onClick={triggerStallCreationModal}>
                        Absolute Next
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Registration;
