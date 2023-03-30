import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
// import "./product.scss";
import config from "../../config.json";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

//
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import "./eventType.css";

//

import Spinner from 'react-bootstrap/Spinner';


const Product = () => {

    //datatable

    const [loader, setLoader] = useState(false)

    const [show, setShow] = useState(false);
    const [uptShow, setUptShow] = useState(false)
    const [delShow, setDelShow] = useState(false)

    const [eventType, setEventType] = useState('')
    const [eventTypeData, setEventTypeData] = useState([])
    const [eventTypeDataRefresh, setEventTypeDataRefresh] = useState(0)

    const handleCreateEventType = () => {

        setLoader(true)

        axios.post(config.baseurl + 'api/organizer/event-type', {
            event_type: eventType
        }).then((res) => {
            console.log('event type ', res.data)
            handleCloseEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh + 1)
            setShow(true)
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            handleCloseEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh + 1)
            setShow(true)
            setLoader(false)
        })
    }

    useEffect(() => {
        setLoader(true)
        axios.get(config.baseurl + 'api/organizer/event-type'
        ).then((res) => {
            setEventTypeData(res.data.data)
            console.log('event data ', res.data.data)
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }, [eventTypeDataRefresh])

    //

    const [eventTypeModal, setEventTypeModal] = useState(false);
    const handleCloseEventTypeModal = () => setEventTypeModal(false);
    const handleOpenEventTypeModal = () => setEventTypeModal(true);

    //

    const [editEventTypeModal, setEditEventTypeModal] = useState(false);
    const handleOpenEditEventTypeModal = () => setEditEventTypeModal(true);
    const handleCloseEditEventTypeModal = () => setEditEventTypeModal(false);

    // Delete Event type

    const [delEventTypeModal, setDelEventTypeModal] = useState(false);
    const handleOpenDelEventTypeModal = () => setDelEventTypeModal(true);
    const handleCloseDelEventTypeModal = () => setDelEventTypeModal(false);


    //

    const [eventTypeId, setEventTypeId] = useState('')
    const [currentEventType, setCurrentEventType] = useState('')

    // Edit event type

    const handleEventTypeEdit = (data) => {
        setLoader(true)
        //get event by event id
        setEventTypeId(data)
        setCurrentEventType('')
        axios.get(config.baseurl + 'api/organizer/event-type/' + data).then((res) => {
            setCurrentEventType(res.data.data[0].event_type)
            handleOpenEditEventTypeModal()
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }

    //    

    const handleSubmitEventTypeEdit = () => {
        setLoader(true)
        axios.put(config.baseurl + 'api/organizer/event-type/' + eventTypeId, {
            event_type: eventType
        }).then((res) => {
            handleCloseEditEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh + 1)
            setUptShow(true)
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            handleCloseEditEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh + 1)
            setUptShow(true)
            setLoader(false)
        })
    }

    //

    const handleEventTypeDel = (data) => {
        setEventTypeId(data)
        axios.get(config.baseurl + 'api/organizer/event-type/' + data).then((res) => {
            setCurrentEventType(res.data.data[0].event_type)
            handleOpenDelEventTypeModal()
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleSubmitEventTypeDelete = () => {
        setLoader(true)
        axios.delete(config.baseurl + 'api/organizer/event-type/' + eventTypeId).then((res) => {
            console.log('deleted successfully')
            setEventTypeDataRefresh(eventTypeDataRefresh + 1)
            handleCloseDelEventTypeModal()
            setDelShow(true)
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            setEventTypeDataRefresh(eventTypeDataRefresh + 1)
            handleCloseDelEventTypeModal()
            setDelShow(true)
            setLoader(false)
        })
        setDelEventTypeModal(true)
    }

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
                            <div class="card mb-4">
                                <div class="card-header pb-3">
                                    <div class="row">
                                        <div class="col-6 d-flex align-items-center">
                                            <h6 class="mb-0">Event Type Master</h6>
                                        </div>

                                        <div class="col-6 text-end">
                                            <button type="button" href="/product/add" class="btn bg-gradient-dark" onClick={handleOpenEventTypeModal}>Create Event Type</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12">
                                    <Row>
                                        <Col xs={6}>
                                            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide style={{ position: 'absolute', right: '0' }}>
                                                <Toast.Header>
                                                    <img
                                                        src="holder.js/20x20?text=%20"
                                                        className="rounded me-2"
                                                        alt=""
                                                    />
                                                    <strong className="me-auto">M8 Eventer</strong>
                                                    <small>Just now</small>
                                                </Toast.Header>
                                                <Toast.Body>Event type added successfully!</Toast.Body>
                                            </Toast>
                                        </Col>
                                    </Row>
                                </div>


                                <div class="col-12">
                                    <Row>
                                        <Col xs={6}>
                                            <Toast onClose={() => setUptShow(false)} show={uptShow} delay={3000} autohide style={{ position: 'absolute', right: '0' }}>
                                                <Toast.Header>
                                                    <img
                                                        src="holder.js/20x20?text=%20"
                                                        className="rounded me-2"
                                                        alt=""
                                                    />
                                                    <strong className="me-auto">M8 Eventer</strong>
                                                    <small>Just now</small>
                                                </Toast.Header>
                                                <Toast.Body>Event type Updated successfully!</Toast.Body>
                                            </Toast>
                                        </Col>
                                    </Row>
                                </div>


                                <div class="col-12">
                                    <Row>
                                        <Col xs={6}>
                                            <Toast onClose={() => setDelShow(false)} show={delShow} delay={3000} autohide style={{ position: 'absolute', right: '0' }}>
                                                <Toast.Header>
                                                    <img
                                                        src="holder.js/20x20?text=%20"
                                                        className="rounded me-2"
                                                        alt=""
                                                    />
                                                    <strong className="me-auto">M8 Eventer</strong>
                                                    <small>Just now</small>
                                                </Toast.Header>
                                                <Toast.Body>Event type Deleted successfully!</Toast.Body>
                                            </Toast>
                                        </Col>
                                    </Row>
                                </div>


                                <div class="card-body px-0 pt-0 pb-2">




                                    <div class="table-responsive p-3">
                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th class="text-secondary opacity-7 ps-2">S.No</th>
                                                    <th class="text-secondary opacity-7 ps-2">Event Type</th>
                                                    <th class="text-secondary opacity-7">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    eventTypeData.map((data, i) => {
                                                        return (

                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td >
                                                                    <p>{data.event_type}</p>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-link text-dark px-3 mb-0" id={data._id} onClick={(e) => handleEventTypeEdit(e.target.id)}><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                                    <a href="#" class="btn btn-link text-danger text-gradient px-3 mb-0" id={data._id} onClick={(e) => handleEventTypeDel(e.target.id)}><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                                                </td>
                                                            </tr>

                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>



                    {/* Create Event  Modal */}

                    <Modal show={eventTypeModal} onHide={handleOpenEventTypeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Event Type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="row">
                                <div class="col-xl-12">
                                    <input type="text" class="form-control" placeholder="Event Type" onChange={(e) => setEventType(e.target.value)}></input>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEventTypeModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleCreateEventType}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Edit Event Modal */}

                    <Modal show={editEventTypeModal} onHide={handleOpenEditEventTypeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Event type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="row">
                                <div class="col-xl-12">
                                    <input type="text" class="form-control" defaultValue={currentEventType} placeholder="Event type name" onChange={(e) => setEventType(e.target.value)}></input>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditEventTypeModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmitEventTypeEdit}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>


                    <Modal show={delEventTypeModal} onHide={handleOpenEditEventTypeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete This Event type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="row">
                                <div class="col-xl-12">
                                    <p>{currentEventType}</p>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDelEventTypeModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmitEventTypeDelete}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>


                </div>
            </main>
        </>
    )
}

export default Product;
