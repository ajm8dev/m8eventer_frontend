import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./main.scss";
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

//
import Spinner from 'react-bootstrap/Spinner';

const Event = () => {

    const [loader, setLoader] = useState(false)

    let superArr = []

    const [totalPriceValue, setTotalPriceValue] = useState(0)

    const handleChangeSinglePost = (value, id) => {

        var widthVal = document.querySelector("input[name='width" + id + "']");
        var heightVal = document.querySelector("input[name='height" + id + "']");
        var priceVal = document.querySelector("input[name='price" + id + "']");

        priceVal.value = ((widthVal.value * heightVal.value) * stallSqftPrice)

        console.log('stall sq ft price ', stallSqftPrice)

        console.log('price value ', ((widthVal.value * heightVal.value) * stallSqftPrice))

        var totalPriceVal = 0
        for (var i = 1; i <= totalStalls; i++) {
            var totalPriceValCalc = document.querySelector("input[name='price" + i + "']");
            totalPriceVal = totalPriceVal + parseFloat(totalPriceValCalc.value)
            if (totalPriceValCalc.value != 0) {
                setTotalPriceValue(parseInt(totalPriceVal))
            }
        }
    }

    // Event creation form hooks

    const [eventName, setEventName] = useState('')
    const [eventDescription, setEventDescription] = useState('')
    const [eventDatesFrom, setEventDatesFrom] = useState('')
    const [eventDatesTo, setEventDatesTo] = useState('')
    const [eventVenue, setEventVenue] = useState('')
    const [eventGeoLocation, setEventGeoLocation] = useState('')
    const [totalStalls, setTotalStalls] = useState('')
    const [stallSqftPrice, setStallSqPrice] = useState('')
    const [organzationId, setOrganizationId] = useState('')
    const [createdBy, setCreatedBy] = useState('')

    //

    const [eventNameError, setEventNameError] = useState(false)

    // Event details set

    const [userOrganization, setUserOrganization] = useState('')


    // Event gallery images

    const [eventGalleryImagesFile, setEventGalleryImagesFile] = useState('')
    const [eventLogoFile, setEventLogoFile] = useState('')


    const [eventType, setEventType] = useState('')
    const [additionalInformation, setAdditionalInformation] = useState('')
    const [timer, setTimer] = useState(false)
    const [stallCreationFrmGen, setStallCreationFrmGen] = useState(false)
    const [eventId, setEventId] = useState('')


    // set Organization id


    // Gallery Images Upload

    const handleEventGalleryImages = (event) => {
        setEventGalleryImagesFile(event.target.files)
        console.log(eventGalleryImagesFile)
    }

    const handleEventLogo = (event) => {
        setEventLogoFile(event.target.files)
        console.log(eventLogoFile)
    }


    // Get logged in user details

    useEffect(() => {
        axios.get(config.baseurl + 'api/user/validate_auth', {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res) => {
            setCreatedBy(res.data.data._id)
            console.log('the organization id', res.data)
            setOrganizationId(res.data.data.organizations.organization_id)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    // Event Creation

    const submitEventCreation = (e) => {
        e.preventDefault()

        if (eventName != "") {

            setLoader(true)

            const formData = new FormData();

            for (var i = 0; i < eventGalleryImagesFile.length; i++) {
                console.log(eventGalleryImagesFile[i]);
                formData.append("event_gallery_images", eventGalleryImagesFile[i])
            }

            for (var i = 0; i < eventLogoFile.length; i++) {
                console.log(eventLogoFile[i])
                formData.append("event_logo", eventLogoFile[i])
            }

            console.log('organization_id ', organzationId)

            formData.append("event_name", eventName)
            formData.append("event_description", eventDescription)
            formData.append("event_venue", eventVenue)
            formData.append('event_from_date', eventDatesFrom)
            formData.append('event_to_date', eventDatesTo)
            formData.append('event_type', eventType)
            formData.append('total_stall', totalStalls)
            formData.append('stall_sq_ft_price', stallSqftPrice)
            formData.append('additional_info', additionalInformation)
            formData.append('organization_id', organzationId)
            formData.append('created_by', createdBy)

            try {
                let response = axios({
                    method: "post",
                    data: formData,
                    url: config.baseurl + 'api/organizer/event/web',
                    headers: { "Content-Type": "multipart/form-data" }
                }).then((res) => {
                    console.log(res.data)
                    setEventId(res.data.data._id)
                    setStallCreationFrmGen(true)
                    setEventCreationModal(false)
                    setComplimentryModal(true)
                    setLoader(false)
                }).catch((err) => {
                    console.log(err)
                })

            } catch (error) {
                console.log(error)
                setLoader(false)
            }
        } else {
            setEventNameError(true)
            setLoader(false)
        }
    }

    useEffect(() => {
        setInterval(() => {
            setSuccessMsg(false)
        }, 6000);
    }, [timer]);

    useEffect(() => {

        let stallCreationFormArr = []
        for (let i = 1; i <= totalStalls; i++) {
            stallCreationFormArr.push(<div class="d-flex mt-3">
                <input class="form-control mb-2 mx-2" placeholder="stall no" value={i}></input>
                <input id={i} class="form-control mb-2 mx-2" placeholder="width" name={"width" + i} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                <input id={i} class="form-control mb-2 mx-2" placeholder="height" name={"height" + i} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                <div class="input-group">
                    <span class="input-group-text mb-2" id="price-batch">₹</span>
                    <input id={i} class="form-control mb-2" type="number" name={"price" + i} aria-label="Price" aria-describedby="price-batch"></input>
                </div>
                <div class="form-check form-switch mx-2">
                    <input id={i} class="form-check-input" type="checkbox" name={"stallactivein-" + i} defaultChecked={true} />
                    <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                </div>
            </div>)
        }
        setStallCreationForm(stallCreationFormArr)
    }, [stallCreationFrmGen])


    // Modal Operation
    const [stallCreationModal, setStallCreationModal] = useState(false)
    const handleCloseStallCreationModal = () => setStallCreationModal(false)

    const [eventCreationModal, setEventCreationModal] = useState(false)
    const handleCloseEventCreationModal = () => setEventCreationModal(false)

    const [complimentryModal, setComplimentryModal] = useState(false)
    const handleCloseComplimentryModal = () => setComplimentryModal(false)

    const [EventViewModal, setEventViewModal] = useState(false)
    const handleCloseEventViewModal = () => setEventViewModal(false)

    //Edit Modal
    const [eventEditModal, setEventEditModal] = useState(false)
    const handleCloseEventEditModal = () => setEventEditModal(false)

    const [returnMsg, setReturnMsg] = useState('false')
    const [edEventName, setEdEventName] = useState('')
    const [edEventDatesFrom, setEdEventDatesFrom] = useState('')
    const [edEventDatesTo, setEdEventDatesTo] = useState('')
    const [edLocation, setEdLocation] = useState('')
    const [edEventType, setEdEventType] = useState('')
    const [edAdditionalInformation, setEdAdditionalInformation] = useState('')
    const [edTotalStalls, setEdTotalStalls] = useState('')
    const [edStallSqftPrice, setEdStallSqPrice] = useState('')

    const triggerEventEditModal = (data) => {
        console.log(data)
        setEventEditModal(true)
        axios.get(config.baseurl + 'api/organizer/event' + '/' + data)
            .then((res) => {
                console.log(res.data.data)
                console.log(res.data.data[0].event_name)
                setEdEventName(res.data.data[0].event_name)
                var date = new Date(res.data.data[0].event_from_date);
                console.log(date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear())
                setEdEventDatesFrom(date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear())
                // setStartDate(date.getDate()+'-' + (date.getMonth()+1) + '-'+date.getFullYear())
                setEdEventDatesTo(res.data.data[0].event_to_date)
                setEdLocation(res.data.data[0].event_venue)
                setEdAdditionalInformation(res.data.data[0].additional_info)
                setEdTotalStalls(res.data.data[0].total_stall)
                setEdStallSqPrice(res.data.data[0].stall_sq_ft_price)
            }).catch((err) => {
                console.log(err)
            })
    }

    const triggerEventCreaitonModal = () => {
        setEventCreationModal(true)
    }

    const triggerStallCreationModal = () => {
        setEventCreationModal(false)
        setStallCreationModal(true)
    }

    const triggerEventViewModal = () => {
        console.log('clicked')
        setEventViewModal(true)
    }

    //

    const [stallCreationForm, setStallCreationForm] = useState('')

    const submitCreateStall = () => {

        setLoader(true)

        console.log('submitted event creation ')

        console.log(eventId)
        superArr = []
        for (let i = 1; i <= totalStalls; i++) {
            var widthVal = document.querySelector("input[name='width" + i + "']");
            var heightVal = document.querySelector("input[name='height" + i + "']");
            var priceVal = document.querySelector("input[name='price" + i + "']");
            var stallActiveIn = document.querySelector("input[name='stallactivein-" + i + "']")

            console.log(widthVal.value, heightVal.value, priceVal.value, stallActiveIn.checked)

            if (stallActiveIn.checked == true) {
                superArr.push({
                    id: widthVal.id,
                    width: widthVal.value,
                    height: heightVal.value,
                    price: priceVal.value
                })
            }

        }

        stallCreationFunction()
    }

    const [triggerEventList, setTriggerEventList] = useState(false)

    const stallCreationFunction = () => {

        console.log('Event Id', eventId)
        console.log(superArr)
        axios.post(config.baseurl + 'api/organizer/event/stalls_data_for_event', {
            event_id: eventId,
            stall_data: superArr
        }).then((res) => {
            console.log(res.data)
            setTriggerEventList(true)
            setStallCreationModal(false)
            setTimer(true)
            setLoader(false)
            setSuccessMsg(true)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }

    // Events list

    const [eventList, setEventList] = useState('')

    useEffect(() => {
        setLoader(true)
        axios.get(config.baseurl + 'api/organizer/event/')
            .then((res) => {
                console.log('event list ', res.data.data.results)
                setEventList(res.data.data.results)
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
                setLoader(false)
            })
    }, [triggerEventList])

    // Delete Event

    const deleteEventFunction = (data) => {
        console.log(data)
    }

    // Complimentry Add Function

    const [complementData, setComplementData] = useState([])
    const [complementExtraData, setComplementExtraData] = useState([])

    // Get Complimentry

    const [complementaryMasterData, setComplementaryMasterData] = useState([])

    useEffect(() => {
        axios.get(config.baseurl + 'api/organizer/complimentary', {
        }).then((res) => {
            setComplementaryMasterData(res.data.data)
            console.log('complimentary data ', res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const submitCreateCompliementry = () => {
        setLoader(true)
        var complementArr = []
        for (let i = 0; i < complementaryMasterData.length; i++) {
            var complementryName = document.querySelector("input[name='cmpname-" + complementaryMasterData[i]._id + "']")
            var freeQty = document.querySelector("input[name='freeqty-" + complementaryMasterData[i]._id + "']")
            var price = document.querySelector("input[name='price-" + complementaryMasterData[i]._id + "']")
            var extraQty = document.querySelector("input[name='extraqty-" + complementaryMasterData[i]._id + "']")
            var compActiveInactive = document.querySelector("input[name='compActiveInactive-" + complementaryMasterData[i]._id + "']")
            console.log(complementryName.value, freeQty.value, price.value, extraQty.value, compActiveInactive.checked)

            var compActiveInactiveStatus
            if (compActiveInactive.checked == true) {
                var compActiveInactiveStatus = '1'
            } else {
                var compActiveInactiveStatus = '0'
            }

            if (compActiveInactive.checked == true) {
                complementArr.push({
                    "complement_id": complementaryMasterData[i]._id,
                    "complementry_name": complementryName.value,
                    "free_qty": freeQty.value,
                    "price": price.value,
                    "extra_amount_fr_eac_qty": extraQty.value,
                    "status": compActiveInactiveStatus
                })
            }
        }

        var complementExtraArr = []

        const extraComplementaryFunction = () => {

            for (let i = 0; i < addMoreComplementaryCount; i++) {
                var complementryName = document.querySelector("input[name='cmpname-" + i + "']")
                var freeQty = document.querySelector("input[name='freeqty-" + i + "']")
                var price = document.querySelector("input[name='price-" + i + "']")
                var extraQty = document.querySelector("input[name='extraqty-" + i + "']")
                var compActiveInactive = document.querySelector("input[name='compActiveInactive-" + i + "']")
                console.log(complementryName.value, freeQty.value, price.value, extraQty.value, compActiveInactive.checked)
                if (compActiveInactive.checked == true) {
                    var compActiveInactiveStatus = '1'
                } else {
                    var compActiveInactiveStatus = '0'
                }

                if (compActiveInactive.checked == true) {
                    if (complementryName.value != "") {
                        complementExtraArr.push({
                            "complementry_name": complementryName.value,
                            "free_qty": freeQty.value,
                            "price": price.value,
                            "extra_amount_fr_eac_qty": extraQty.value,
                            "status": compActiveInactiveStatus
                        })
                    }
                }
            }
        }
        
        extraComplementaryFunction()
        setComplementData(complementArr)
        setComplementExtraData(complementExtraArr)
    }

    useEffect(() => {
        if (complementData != '' || complementExtraData != '') {
            axios.post(config.baseurl + 'api/organizer/complimentary/complementary-data-fr-event', {
                "event_id": eventId,
                "complement_data": complementData,
                "complement_extra_data": complementExtraData
            }).then((res) => {
                console.log(res.data)
                setComplimentryModal(false)
                setStallCreationModal(true)
                setLoader(false)
            }).catch((err) => {
                console.log(err)
                setLoader(false)
            })
        }
    }, [complementData, complementExtraData])


    // Add More Complementary Functions

    const [addMoreComplementaryData, setAddMoreComplementaryData] = useState('')
    const [addMoreComplementaryCount, setAddMoreComplementaryCount] = useState(0)

    const addMoreComplementary = () => {
        setAddMoreComplementaryCount(addMoreComplementaryCount + 1)
        setAddMoreComplementaryData([
            ...addMoreComplementaryData,
            <div class="d-flex mt-3">
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"cmpname-" + addMoreComplementaryCount} placeholder="Complimentry Name"></input>
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"freeqty-" + addMoreComplementaryCount} placeholder="Free qty"></input>
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"price-" + addMoreComplementaryCount} placeholder="Price"></input>
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"extraqty-" + addMoreComplementaryCount} placeholder="Extra Qty Allowed"></input>
                <div class="form-check form-switch mx-2">
                    <input class="form-check-input" type="checkbox" role="switch" name={"compActiveInactive-" + addMoreComplementaryCount} id={addMoreComplementaryCount} defaultChecked={true} />
                    <label class="form-check-label" for={addMoreComplementaryCount}>Active</label>
                </div>
            </div>
        ])
    }


    const [successMsg, setSuccessMsg] = useState(false);
    //const [showB, setShowB] = useState(true);

    const [eventTypeList, setEventTypeList] = useState([])

    useEffect(() => {
        axios.get(config.baseurl + 'api/organization-type')
            .then((res) => {
                console.log(res.data)
                console.log('the data', res.data.data)
                setEventTypeList(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    //

    const [eventTypeData, setEventTypeData] = useState([])

    useEffect(() => {
        axios.get(config.baseurl + 'api/organizer/event-type').then((res) => {
            console.log('event type dataa ', res.data.data)
            setEventTypeData(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    //Date Picker
    const [startDate, setStartDate] = useState(new Date());

    return (
        <>

            {
                loader ? (<div class="row">
                    <div class="col-xl-12">
                        <div className="d-flex justify-content-center align-items-center event-type-styles">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    </div>
                </div>) : (<div></div>)
            }

            <div class="min-height-300 bg-primary position-absolute w-100"></div>
            <Sidebar />
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-12">
                            <div class="card mb-4" style={{ postition: 'relative' }}>
                                <div class="card-header pb-3">
                                    <div class="row">
                                        <div class="col-6 d-flex align-items-center">
                                            <h6 class="mb-0">Events For You</h6>
                                        </div>

                                        <div class="col-6 text-end">
                                            <button type="button" href="/product/add" class="btn bg-gradient-dark" onClick={triggerEventCreaitonModal}>Create an Event</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body px-0 pt-0 pb-2" >
                                    <div class="row" style={{ position: 'absolute', right: '0', top: '-30px' }}>
                                        <div class="col-xl-12">
                                            {
                                                returnMsg == 'true' ?
                                                    <Alert variant="success">
                                                        <p class="mb-0" style={{ color: '#fff' }}>
                                                            Event Created Successfully
                                                        </p>
                                                    </Alert> : null
                                            }
                                        </div>
                                    </div>
                                    <div class="table-responsive p-3">
                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th class="text-secondary opacity-7 ps-2">S.No</th>
                                                    <th class="text-secondary opacity-7 ps-2">Event Name</th>
                                                    <th class="text-secondary opacity-7">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    eventList != "" ?
                                                        eventList.map((data, i) => {
                                                            return (
                                                                <tr>
                                                                    <td>{i + 1}</td>
                                                                    <td >
                                                                        <div>
                                                                            <h5>{data.expo_name}</h5>
                                                                            {/* <p>{data.description}</p> */}
                                                                            <p style={{marginTop: '30px', marginBottom: '0px'}}>Total Stalls: {data.total_stalls}</p>
                                                                            <p>Available Stalls: {data.available_stalls}</p>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <a href={'./event/event-edit/' + data._id} class="btn btn-link text-dark px-3 mb-0" ><Button class="btn btn-primary"><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>View & Update</Button></a>
                                                                        <a href={'/super-admin/user-management/' + localStorage.getItem('organization_id') + '/' + data._id} class="btn btn-link text-dark px-3 mb-0" ><Button class="btn btn-secondary"><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>User Management</Button></a>
                                                                        <a href={'/visitor-registration/' + localStorage.getItem('organization_id')+ '/' + data._id} class="btn btn-link text-dark px-3 mb-0" ><Button class="btn btn-secondary"><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Registration</Button></a>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : null
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Stall Creation Modal */}
                </div>
            </main>
            {/* Modals */}

            <Modal show={eventCreationModal} onHide={handleCloseEventCreationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Create an Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-xl-12">
                            {
                                eventNameError ? (<div className="card">
                                    <div className="card-body">


                                        <span style={{ color: 'red', fontSize: '14px' }}>event name cannot be empty</span>
                                    </div>
                                </div>) : (<div></div>)
                            }
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label for="event_name" class="form-label">Event Name</label>
                                <input type="text" class="form-control" id="event_name" placeholder="eg. Event Name" onChange={(e) => setEventName(e.target.value)} required />

                            </div>
                            <div class="mb-3">
                                <label for="event_name" class="form-label">Event Dates (Starts From)</label>
                                <input type="date" class="form-control event-date-from" id="event_name" placeholder="" onChange={(e) => setEventDatesFrom(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="event_name" class="form-label">Event Dates (End)</label>
                                <input type="date" class="form-control event-date-to" id="event_name" placeholder="" onChange={(e) => setEventDatesTo(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Location</label>
                                <input type="text" class="form-control" id="location" placeholder="Location" onChange={(e) => setEventVenue(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Event Type</label>

                                {

                                    <Form.Select aria-label="Default select example" onChange={e => { setEventType(e.target.value) }}>
                                        <option value="">select</option>
                                        {
                                            eventTypeList.map((data, i) => {
                                                return (
                                                    <option value={data._id}>{data.organization_type}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>

                                }

                                {/* <Form.Select aria-label="Default select example">
                                    <option>select</option>                                    
                                </Form.Select> */}

                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label for="location" class="form-label">Total Stalls</label>
                                <input type="number" class="form-control" id="location" placeholder="Total Stalls" min={1} max={100} onChange={(e) => setTotalStalls(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Stall Sq ft Price</label>
                                <input type="number" class="form-control" id="location" placeholder="Stall Sq ft Price" onChange={(e) => setStallSqPrice(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Additional Information</label>
                                <textarea type="text" class="form-control" id="location" rows="5" placeholder="Additional Information" onChange={(e) => setAdditionalInformation(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="event_gallery_images" class="form-label">Event Gallery Images</label>
                                <input type="file" class="form-control" onChange={handleEventGalleryImages} id="event_gallery_images" placeholder="Complimentary" multiple />
                            </div>
                            <div class="mb-3">
                                <label for="event_logo" class="form-label">Event Logo</label>
                                <input type="file" class="form-control" onChange={handleEventLogo} id="event_logo" placeholder="Complimentary" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEventCreationModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitEventCreation}>
                        Next
                    </Button>
                    {/* <Button variant="success" onClick={triggerStallCreationModal}>
                        Absolute Next
                    </Button> */}
                </Modal.Footer>
            </Modal>


            <Modal show={stallCreationModal} onHide={handleCloseStallCreationModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Stall Creation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form class="needs-validation">
                        {/* <div class="alert alert-warning d-flex align-items-center" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <div>
                                <p class="alert-para mb-0">Note: Totally {totalStalls} Stalls Created, In Default Undefined Stalls are Not Available For Further Process</p>
                            </div>
                        </div> */}
                        {/* <div class="row">
                            <div class="col-xl-4">
                                <input class="form-control mb-2 mx-2" placeholder="layout" value="Layout-1"></input>
                            </div>
                        </div> */}
                        {/*  */}

                        <div class="stall-box">
                            {
                                stallCreationForm != "" ?
                                    stallCreationForm : null
                            }
                        </div>

                        <div class="row mt-5">
                            <div class="col-xl-12">
                                <div class="alert alert-warning para-all-fff" role="alert">
                                    <p class="mb-0">Total Stalls Created, {totalStalls}</p>
                                    {/* <p class="mb-0">Total Stalls Allocated</p>
                                    <p class="mb-0">Un Allocated Stalls, 24</p>
                                    <p class="mb-0">Total Sq Occupied 3400 sq</p> */}
                                    <p class="mb-0">Total Price, ₹ {totalPriceValue}</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseStallCreationModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitCreateStall}>
                        Create an event
                    </Button>
                    {/* <Button variant="primary" onClick={getSumValue}>
                        get Values
                    </Button> */}
                </Modal.Footer>
            </Modal>

            <Modal show={complimentryModal} onHide={handleCloseComplimentryModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a Complimentry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        complementaryMasterData != "" ?

                            complementaryMasterData.map((data, i) => {
                                return (
                                    <div class="d-flex mt-3">
                                        <input id={data._id} class="form-control mb-2 mx-2" name={"cmpname-" + data._id} placeholder="Complimentry Name" defaultValue={data.complimentary_name} disabled></input>
                                        <input id={data._id} class="form-control mb-2 mx-2" name={"freeqty-" + data._id} placeholder="Free qty"></input>
                                        <input id={data._id} class="form-control mb-2 mx-2" name={"price-" + data._id} placeholder="Price"></input>
                                        <input id={data._id} class="form-control mb-2 mx-2" name={"extraqty-" + data._id} placeholder="Extra Qty Allowed"></input>
                                        <div class="form-check form-switch mx-2">
                                            <input id={data._id} class="form-check-input" name={"compActiveInactive-" + data._id} type="checkbox" defaultChecked={true} />
                                            <label class="form-check-label" for={data._id}>Active</label>
                                        </div>
                                    </div>
                                )
                            }) : null
                    }

                    {
                        addMoreComplementaryData != ""
                            ?
                            addMoreComplementaryData
                            :
                            null
                    }

                    <Button variant="secondary" class="btn btn-secondary mt-3" onClick={addMoreComplementary}>(+) Add More</Button>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseComplimentryModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitCreateCompliementry}>
                        Next
                    </Button>
                    {/* <Button variant="primary" onClick={getSumValue}>
                        get Values
                    </Button> */}
                </Modal.Footer>
            </Modal>

            {/* View Modal */}

            <Modal show={EventViewModal} onHide={handleCloseEventViewModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Event Name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-xl-12">
                            <Table striped bordered hover size="sm">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Particulars</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Event Name</td>
                                        <td>Tatum Bennett</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Event Dates (Starts From)</td>
                                        <td>12/10/2022</td>
                                    </tr>

                                    <tr>
                                        <td>3</td>
                                        <td>Event Dates (Starts End)</td>
                                        <td>14/10/2022</td>
                                    </tr>

                                    <tr>
                                        <td>4</td>
                                        <td>Location</td>
                                        <td>Coimbatore</td>
                                    </tr>

                                    <tr>
                                        <td>5</td>
                                        <td>Event Type</td>
                                        <td>Jewellery</td>
                                    </tr>

                                    <tr>
                                        <td>6</td>
                                        <td>Total Stalls</td>
                                        <td>12</td>
                                    </tr>

                                    <tr>
                                        <td>7</td>
                                        <td>Single Square Feet Price</td>
                                        <td>12</td>
                                    </tr>

                                    <tr>
                                        <td>8</td>
                                        <td>Single Square Feet Price</td>
                                        <td>175</td>
                                    </tr>

                                    <tr>
                                        <td>9</td>
                                        <td>Additional Information</td>
                                        <td>Lorem ipsum</td>
                                    </tr>

                                </tbody>
                            </Table>
                            <hr></hr>
                            <p>Details</p>

                            <Tab.Container id="left-tabs-example">
                                <Row>
                                    <Nav variant="pills">
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">
                                                <Button variant="primary">Complementary</Button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">
                                                <Button variant="primary">Stalls</Button>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fourth">
                                                <Button variant="primary">Gallery Images</Button>
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="second">
                                            <Table striped bordered hover size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Complementry Name</th>
                                                        <th>Free Qty</th>
                                                        <th>Price</th>
                                                        <th>Extra Qty Allowed</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Food</td>
                                                        <td>3</td>
                                                        <td>₹ 3120</td>
                                                        <td>10</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Chair</td>
                                                        <td>5</td>
                                                        <td>₹ 150</td>
                                                        <td>10</td>
                                                    </tr>

                                                </tbody>
                                            </Table>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="third">
                                            <div class="stall-grid">
                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>
                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>
                                                <div class="stall-layout-box">
                                                    <p>500*600</p>
                                                </div>

                                            </div>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="fourth">
                                            <div class="stall-grid">
                                                <div class="stall-layout-box">
                                                    <img class="event-gallery-img" src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"></img>
                                                    <img class="event-gallery-img" src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"></img>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Row>
                            </Tab.Container>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEventViewModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseEventViewModal}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/*  Event Edit Modal */}

            <Modal show={eventEditModal} onHide={handleCloseEventEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit an Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="row">
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label for="event_name" class="form-label">Event Name</label>
                                <input type="text" class="form-control" id="event_name" placeholder="eg. Event Name" onChange={(e) => setEdEventName(e.target.value)} defaultValue={edEventName} />
                            </div>
                            <div class="mb-3">
                                <label for="event_name" class="form-label">Event Dates (Starts From)</label>
                                <input type="date" class="form-control event-ed-date-from" id="event_name" placeholder="" onChange={(e) => setEventDatesFrom(e.target.value)} />
                            </div>
                            <DatePicker selected={startDate} />
                            <div class="mb-3">
                                <label for="event_name" class="form-label">Event Dates (End)</label>
                                <input type="date" class="form-control event-date-to" id="event_name" placeholder="" onChange={(e) => setEventDatesTo(e.target.value)} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Location</label>
                                <input type="text" class="form-control" id="location" placeholder="Location" onChange={(e) => setEdLocation(e.target.value)} defaultValue={edLocation} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Event Type</label>

                                {
                                    eventTypeList != "" ?
                                        <Form.Select aria-label="Default select example" onChange={e => { setEventType(e.target.value) }}>
                                            <option value="">select</option>
                                            {
                                                eventTypeList.map((data, i) => {
                                                    return (
                                                        <option value={data._id}>{data.event_type}</option>
                                                    )
                                                })
                                            }
                                        </Form.Select>
                                        : null
                                }

                                {/* <Form.Select aria-label="Default select example">
                                    <option>select</option>
                                    
                                </Form.Select> */}


                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div class="mb-3">
                                <label for="location" class="form-label">Total Stalls</label>
                                <input type="number" class="form-control" id="" placeholder="Total Stalls" onChange={(e) => setEdTotalStalls(e.target.value)} defaultValue={edTotalStalls} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Stall Sq ft Price</label>
                                <input type="number" class="form-control" id="" placeholder="Stall Sq ft Price" onChange={(e) => setEdStallSqPrice(e.target.value)} defaultValue={edStallSqftPrice} />
                            </div>
                            <div class="mb-3">
                                <label for="location" class="form-label">Additional Information</label>
                                <textarea type="text" class="form-control" id="" rows="5" placeholder="Additional Information" onChange={(e) => setEdAdditionalInformation(e.target.value)} defaultValue={edAdditionalInformation} />
                            </div>
                        </div>
                    </div>
                    <img>
                    </img>
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="mb-3">
                                <label for="event_gallery_images" class="form-label">Event Gallery Images</label>
                                <input type="file" class="form-control" onChange={handleEventGalleryImages} id="event_gallery_images" placeholder="Complimentary" multiple />
                            </div>

                            <div class="row">
                                <div class="col-xl-3">
                                    <img src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80" style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}></img>
                                </div>
                                <div class="col-xl-3">
                                    <img src="https://images.unsplash.com/photo-1464047736614-af63643285bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}></img>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="event_logo" class="form-label">Event Logo</label>
                                <input type="file" class="form-control" onChange={handleEventLogo} id="event_logo" placeholder="Complimentary" />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEventEditModal}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={submitEventCreation}>
                        Next
                    </Button>
                    {/* <Button variant="success" onClick={triggerStallCreationModal}>
                        Absolute Next
                    </Button> */}
                </Modal.Footer>
            </Modal>

            {/* Toast Message */}

            <Toast show={successMsg} style={{ position: "absolute", bottom: "10%", right: "3%", zIndex: "1", backgroundColor: "rgb(51 255 140)" }}>
                <Toast.Body style={{ color: '#fff' }}>Event Crated Successfully</Toast.Body>
            </Toast>
        </>
    )
}

export default Event;
