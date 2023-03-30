import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./Usermanagement.css";
import config from "../../config.json";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams } from 'react-router-dom';


const Usermanagement = () => {

    const [userData, setUserData] = useState([])
    const [state, setState] = useState([])

    const [usersCount, setUsersCount] = useState(0)
    const [organizerCount, setOrganizerCount] = useState(0)

    const { organization_id } = useParams();
    const { event_id } = useParams()

    let mainEventiId = event_id
    let organizationId = organization_id

    //get login user details

    // useEffect(() => {
    //     axios.get(config.baseurl + 'api/users/get_all_user_users', {
    //     }).then((res) => {    
    //         console.log('get all users ', res.data.data)
    //         setUserData(res.data.data)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, [])

    // get visitors and users for the event

    const [eventData, setEventData] = useState([])

    useEffect(() => {
        axios.get(config.baseurl + 'api/user-management/' + mainEventiId, {
        }).then((res) => {
            console.log('event details ', res?.data?.data[0]?.eventDetailsData[0]?.event_name)
            setUserData(res?.data?.data[0]?.visitorsNdUsersData)
            setEventData(res?.data?.data[0]?.eventDetailsData)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const onChangeOfPhoneNumber = (data) => {
        setState('searching...')
        setUserData([])
        if (data != "") {
            axios.post(config.baseurl + 'api/users/search/by_phone_number', {
                phone_number: data
            }).then((res) => {
                console.log(res.data.data)
                if (res.data.data != undefined) {
                    setUserData(res.data.data)
                } else {
                    setState('not found')
                }
            }).catch((err) => {
                alert('something went wrong')
            })
        } else {
            axios.get(config.baseurl + 'api/users/get_all_user_users', {
            }).then((res) => {
                console.log(res.data)
                setUserData(res.data.data)
            }).catch((err) => {
            })
        }
    }

    const onChangeOfName = (data) => {
        setState('searching...')
        setUserData([])
        axios.get(config.baseurl + 'api/users/search_filer_name/' + data, {
        }).then((res) => {
            console.log(res.data)
            console.log(res.data.data)
            if (res.data.data != "") {

                let makeArr = []
                let theOrganizationName = ""

                for (let i = 0; i < res.data.data.length; i++) {

                    if (res.data.data[i].type == 'visitor') {
                        theOrganizationName = res.data.data[i].organization
                    } else if (res.data.data[i].type == 'super-admin') {
                        theOrganizationName = "123"
                    } else {
                        theOrganizationName = res.data.data[i].organization.organization_name
                    }

                    if (res.data.data[i].type != 'super-admin') {
                        makeArr.push({
                            username: res.data.data[i].username,
                            phone_number: res.data.data[i].phone_number,
                            email: res.data.data[i].email,
                            address: res.data.data[i].address,
                            type: res.data.data[i].type,
                            organization_id: {
                                organization_name: theOrganizationName
                            }
                        })
                    }

                }
                setUserData(makeArr)
            } else {
                setState('not found')
            }
        }).catch((err) => {

        })
    }

    const onhandleExhibitor = () => {
        setState('searching...')
        setUserData([])
        axios.get(config.baseurl + 'api/users/get_exhibitor_staff_list/' + organizationId, {
        }).then((res) => {
            if (res.data.data[0].result.length > 0) {
                let makeArr = []
                let theOrganizationName = ""
                for (let i = 0; i < res.data.data[0].result.length; i++) {
                    makeArr.push({
                        username: res.data.data[0].result[i].username,
                        phone_number: res.data.data[0].result[i].phone_number,
                        email: res.data.data[0].result[i].email,
                        address: res.data.data[0].result[i].address,
                        type: res.data.data[0].result[i].type,
                        organization_id: {
                            organization_name: res.data.data[0].organization.organization_name
                        }
                    })
                }
                setUserData(makeArr)
            } else {
                setState('exhibitor details empty...')
            }
            console.log('exhibitor organization data', res.data)
            console.log('exhibitor organization', res.data.data[0].organization.organization_name)

        }).catch((err) => {
            setState('searching...')
        })
    }

    //

    const onhandleOrganizer = () => {
        setState('searching...')
        setUserData([])
        axios.get(config.baseurl + 'api/users/get_organizer_staff_list/' + organizationId, {
        }).then((res) => {
            console.log('organization_data ', res.data)
            console.log(res.data.data[0].result[0].username)
            console.log('organization organization', res.data.data[0].organization.organization_name)
            let makeArr = []
            let theOrganizationName = ""

            for (let i = 0; i < res.data.data[0].result.length; i++) {
                makeArr.push({
                    username: res.data.data[0].result[i].username,
                    phone_number: res.data.data[0].result[i].phone_number,
                    email: res.data.data[0].result[i].email,
                    address: res.data.data[0].result[i].address,
                    type: res.data.data[0].result[i].type,
                    organization_id: {
                        organization_name: res.data.data[0].organization.organization_name
                    }
                })
            }
            setUserData(makeArr)

        }).catch((err) => {

        })
    }

    const onhandleVisitors = () => {
        setState('searching...')
        setUserData([])
        axios.get(config.baseurl + 'api/users/get_all_visitors/' + mainEventiId, {
        }).then((res) => {
            console.log('visitor_data ', res.data)
            console.log(res.data.data[0].username)
            let makeArr = []
            let theOrganizationName = ""

            for (let i = 0; i < res.data.data.length; i++) {

                if (res.data.data[i].organization != "") {
                    theOrganizationName = res.data.data[i].organization
                } else {
                    theOrganizationName = ""
                }

                makeArr.push({
                    username: res.data.data[i].username,
                    phone_number: res.data.data[i].phone_number,
                    email: res.data.data[i].email,
                    address: res.data.data[i].address,
                    type: res.data.data[i].type,
                    organization_id: {
                        organization_name: theOrganizationName
                    }
                })
            }
            setUserData(makeArr)

        }).catch((err) => {

        })
    }

    const onhandleAllusers = () => {
        axios.get(config.baseurl + 'api/users/get_all_user_users', {
        }).then((res) => {
            console.log(res.data)
            setUserData(res.data.data)
        }).catch((err) => {
            console.log('err')
        })
    }

    
      

    return (
        <>
            <div class="min-height-300 bg-primary position-absolute w-100"></div>
            <Sidebar />
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-12">
                            <div class="card mb-4">
                                <div class="card-header pb-3">
                                    <div class="row">
                                        <div class="">
                                            <h6 class="mb-0" style={{ fontSize: '24px' }}>USERS LIST</h6>
                                        </div>
                                    </div>
                                    <br></br>
                                    {/* <div class="row">
                                        <div class="col-xl-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <p>Total Users</p>
                                                    <h1>172</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <p>Total Exhibitors Staffs</p>
                                                    <h1>62</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-xl-4">
                                            <div class="card">
                                                <div class="card-body">
                                                    <p>Total Organizer Staffs</p>
                                                    <h1>32</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <br></br>
                                    {/* <button onClick={handleGetValue}>click Me</button> */}
                                    <div class="card">
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-xl-6">
                                                    <p>Filter By Phone Number</p>
                                                    <div class="col-12 d-flex align-items-center">

                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Phone Number"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                onChange={(e) => onChangeOfPhoneNumber(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                                <div class="col-xl-6">
                                                    <p>Filter By Name</p>
                                                    <div class="col-12 d-flex align-items-center">

                                                        <InputGroup className="mb-3">
                                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                                            <Form.Control
                                                                placeholder="Name"
                                                                aria-label="Username"
                                                                aria-describedby="basic-addon1"
                                                                onChange={(e) => onChangeOfName(e.target.value)}
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-xl-12 d-flex">
                                            <div class="tag-filter" onClick={onhandleAllusers}>All</div>
                                            <div class="tag-filter" onClick={onhandleExhibitor}>Exhibitors List</div>
                                            <div class="tag-filter" onClick={onhandleOrganizer}>Organizers List</div>
                                            <div class="tag-filter" onClick={onhandleVisitors}>Visitors List</div>
                                            {/* <div class="tag-filter" onClick={handleGetValue}>Get Value</div> */}
                                        </div>
                                    </div>
                                    <br></br>
                                    <br></br>
                                    <div class="row">
                                        <div class="col-xl-12" style={{ width: '100%', overflowX: 'scroll', height: '100vh' }}>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th style={{ width: '25%' }}>Address</th>
                                                        <th>Type</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        userData != "" ?
                                                            userData.map((item, index) =>
                                                                <>
                                                                    <tr>
                                                                        <td>{item?.name}</td>
                                                                        <td>{item?.email}</td>
                                                                        <td>{item?.address}</td>
                                                                        <td>{item?.type}</td>
                                                                        <td><a href={'/visitor-registration/qr/' + item?.id + '/' + item?.name + '/' + item?.organization_name + '/'+ eventData[0]?.event_name + '/' + eventData[0]?.event_from_date +'/' + eventData[0]?.event_to_date +'/'+eventData[0]?.event_venue+'/'+'TIME 11AM - 8PM'}>print</a></td>
                                                                    </tr>
                                                                </>
                                                            ) : <p>{state}</p>

                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Usermanagement;
