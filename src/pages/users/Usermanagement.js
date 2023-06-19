import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./Usermanagement.css";
import config from "../../config.json";
import { useState, useEffect } from "react";
import React from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import axios from "axios";
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

    const [stateToggler, setStateToggler] = useState([])

    // get visitors and users for the event

    const [eventData, setEventData] = useState([])

    useEffect(() => {
        axios.get(config.baseurl + 'api/user-management/' + mainEventiId, {
        }).then((res) => {
            setEventData(res?.data?.data[0]?.eventDetailsData)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    //

    useEffect(() => {
        axios.post(config.baseurl + 'api/users/filtr/all/event', {
            event_id: mainEventiId
        }).then((res) => {
            console.log('filter all results ', res.data.data)
                if (res.data.data != "") {
                    let makeArr = []
                    let theOrganizationName = ""
                    for (let i = 0; i < res.data.data.length; i++) {

                        if (res.data.data[i].type == 'visitor') {
                            theOrganizationName = res.data.data[i].organization
                        } else if (res.data.data[i].type == 'super-admin') {
                            theOrganizationName = "123"
                        } else {
                            theOrganizationName = res.data.data[i].organization
                        }

                        if (res.data.data[i].type != 'super-admin') {
                            makeArr.push({
                                id: res.data.data[i]._id,
                                username: res.data.data[i].name,
                                phone_number: res.data.data[i].phone_number,
                                email: res.data.data[i].email_address,
                                address: res.data.data[i].location,
                                type: res.data.data[i].type,
                                organization: theOrganizationName
                            })
                        }

                    }
                    setUserData(makeArr)
                } else {
                    setState('not found')
                }
        }).catch((err) => {
            console.log('err')
        })
    },[stateToggler])

    const onChangeOfPhoneNumber = (data) => {
        setState('searching...')
        setUserData([])
        if (data != "") {
            axios.post(config.baseurl + 'api/users/search/event/phone-number', {
                phone_number: data,
                event_id: mainEventiId
            }).then((res) => {
                console.log('search result phone ', res.data.data)
                if (res.data.data != "") {
                    let makeArr = []
                    let theOrganizationName = ""
                    for (let i = 0; i < res.data.data.length; i++) {

                        if (res.data.data[i].type == 'visitor') {
                            theOrganizationName = res.data.data[i].organization
                        } else if (res.data.data[i].type == 'super-admin') {
                            theOrganizationName = "123"
                        } else {
                            theOrganizationName = res.data.data[i].organization
                        }

                        if (res.data.data[i].type != 'super-admin') {
                            makeArr.push({
                                id: res.data.data[i]._id,
                                username: res.data.data[i].name,
                                phone_number: res.data.data[i].phone_number,
                                email: res.data.data[i].email_address,
                                address: res.data.data[i].location,
                                type: res.data.data[i].type,
                                organization: theOrganizationName
                            })
                        }

                    }
                    setUserData(makeArr)
                } else {
                    setState('not found')
                }
            }).catch((err) => {
                alert('something went wrong')
            })
        } else {
            setStateToggler(!stateToggler)
        }
    }

    const onChangeOfName = (data) => {

        if (data != "") {
            setState('searching...')
            setUserData([])
            axios.post(config.baseurl + 'api/users/search/event/name', {
                event_id: mainEventiId,
                name: data
            }).then((res) => {
                console.log('search result name ', res.data.data)
                if (res.data.data != "") {

                    let makeArr = []
                    let theOrganizationName = ""

                    for (let i = 0; i < res.data.data.length; i++) {

                        if (res.data.data[i].type == 'visitor') {
                            theOrganizationName = res.data.data[i].organization
                        } else if (res.data.data[i].type == 'super-admin') {
                            theOrganizationName = "123"
                        } else {
                            theOrganizationName = res.data.data[i].organization
                        }

                        if (res.data.data[i].type != 'super-admin') {
                            makeArr.push({
                                id: res.data.data[i]._id,
                                username: res.data.data[i].name,
                                phone_number: res.data.data[i].phone_number,
                                email: res.data.data[i].email_address,
                                address: res.data.data[i].location,
                                type: res.data.data[i].type,
                                organization: theOrganizationName
                            })
                        }

                    }
                    setUserData(makeArr)
                } else {
                    setState('not found')
                }
            }).catch((err) => {

            })
        } else {
            setState('Loading...')
        }

    }

    const onhandleExhibitor = () => {
        setState('searching...')
        setUserData([])
        axios.post(config.baseurl + 'api/users/filtr/exhibitors/event', {
            event_id: mainEventiId
        }).then((res) => {
            if (res.data.data != "") {
                let makeArr = []
                let theOrganizationName = ""
                for (let i = 0; i < res.data.data.length; i++) {

                    if (res.data.data[i].type == 'visitor') {
                        theOrganizationName = res.data.data[i].organization
                    } else if (res.data.data[i].type == 'super-admin') {
                        theOrganizationName = "123"
                    } else {
                        theOrganizationName = res.data.data[i].organization
                    }

                    if (res.data.data[i].type != 'super-admin') {
                        makeArr.push({
                            id: res.data.data[i]._id,
                            username: res.data.data[i].name,
                            phone_number: res.data.data[i].phone_number,
                            email: res.data.data[i].email_address,
                            address: res.data.data[i].location,
                            type: res.data.data[i].type,
                            organization: theOrganizationName
                        })
                    }

                }
                setUserData(makeArr)
            } else {
                setState('not found')
            }

        }).catch((err) => {
            setState('searching...')
        })
    }

    //

    const onhandleOrganizer = () => {
        setState('searching...')
        setUserData([])
        axios.post(config.baseurl + 'api/users/filtr/organizer/event',{
            event_id: mainEventiId
        }).then((res) => {
            if (res.data.data != "") {
                let makeArr = []
                let theOrganizationName = ""
                for (let i = 0; i < res.data.data.length; i++) {

                    if (res.data.data[i].type == 'visitor') {
                        theOrganizationName = res.data.data[i].organization
                    } else if (res.data.data[i].type == 'super-admin') {
                        theOrganizationName = "123"
                    } else {
                        theOrganizationName = res.data.data[i].organization
                    }

                    if (res.data.data[i].type != 'super-admin') {
                        makeArr.push({
                            id: res.data.data[i]._id,
                            username: res.data.data[i].name,
                            phone_number: res.data.data[i].phone_number,
                            email: res.data.data[i].email_address,
                            address: res.data.data[i].location,
                            type: res.data.data[i].type,
                            organization: theOrganizationName
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

    const onhandleVisitors = () => {
        setState('searching...')
        setUserData([])
        axios.post(config.baseurl + 'api/users/filtr/visitors/event', {
            event_id: mainEventiId
        }).then((res) => {
            if (res.data.data != "") {
                let makeArr = []
                let theOrganizationName = ""
                for (let i = 0; i < res.data.data.length; i++) {

                    if (res.data.data[i].type == 'visitor') {
                        theOrganizationName = res.data.data[i].organization
                    } else if (res.data.data[i].type == 'super-admin') {
                        theOrganizationName = "123"
                    } else {
                        theOrganizationName = res.data.data[i].organization
                    }

                    if (res.data.data[i].type != 'super-admin') {
                        makeArr.push({
                            id: res.data.data[i]._id,
                            username: res.data.data[i].name,
                            phone_number: res.data.data[i].phone_number,
                            email: res.data.data[i].email_address,
                            address: res.data.data[i].location,
                            type: res.data.data[i].type,
                            organization: theOrganizationName
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

    const onhandleAllusers = () => {
        axios.post(config.baseurl + 'api/users/filtr/all/event', {
            event_id: mainEventiId
        }).then((res) => {
            console.log('filter all results ', res.data.data)
                if (res.data.data != "") {
                    let makeArr = []
                    let theOrganizationName = ""
                    for (let i = 0; i < res.data.data.length; i++) {

                        if (res.data.data[i].type == 'visitor') {
                            theOrganizationName = res.data.data[i].organization
                        } else if (res.data.data[i].type == 'super-admin') {
                            theOrganizationName = "123"
                        } else {
                            theOrganizationName = res.data.data[i].organization
                        }

                        if (res.data.data[i].type != 'super-admin') {
                            makeArr.push({
                                id: res.data.data[i]._id,
                                username: res.data.data[i].name,
                                phone_number: res.data.data[i].phone_number,
                                email: res.data.data[i].email_address,
                                address: res.data.data[i].location,
                                type: res.data.data[i].type,
                                organization: theOrganizationName
                            })
                        }

                    }
                    setUserData(makeArr)
                } else {
                    setState('not found')
                }
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
                                            <h6 class="mb-0" style={{ fontSize: '24px' }}>USERS LIST</h6><br></br>
                                        </div>
                                    </div>
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
                                                                        <td>{item?.username}</td>
                                                                        <td>{item?.email}</td>
                                                                        <td>{item?.address}</td>
                                                                        <td>{item?.type}</td>
                                                                        <td><a href={'/visitor-registration/qr/' + item?.id + '/' + item?.username + '/' + item?.organization + '/' + eventData[0]?.event_name + '/' + eventData[0]?.event_from_date + '/' + eventData[0]?.event_to_date + '/' + eventData[0]?.event_venue + '/' + 'TIME%2011AM%20%2D%208PM'}>print</a></td>
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
