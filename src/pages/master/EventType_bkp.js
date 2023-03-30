import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
// import "./product.scss";
import config from "../../config.json";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Product = () => {

    const [eventType, setEventType] = useState('')
    const [eventTypeData, setEventTypeData] = useState([])
    const [eventTypeDataRefresh, setEventTypeDataRefresh] = useState(0)

    const handleCreateEventType = () => {
        axios.post(config.baseurl + 'api/organizer/event-type', {
            event_type: eventType
        }).then((res) => {
            console.log(res.data)
            handleCloseEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh+1)
        }).catch((err) => {
            console.log(err)
            handleCloseEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh+1)
        })
    }

    useEffect(() => {
        axios.get(config.baseurl + 'api/organization-type'
        ).then((res) => {
            setEventTypeData(res.data.data)
            console.log(res.data)
            console.log('organization data ', res.data.data)
        }).catch((err) => {
            console.log(err)
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

    //

    const [eventTypeId, setEventTypeId] = useState('')
    const [currentEventType, setCurrentEventType] = useState('')

    // Edit Complimentary

    const handleEventTypeEdit = (data) => {
        setCurrentEventType('')
        axios.get(config.baseurl + 'api/organization-type/org_id/'+data).then((res) => {
            setCurrentEventType(res.data.data[0].organization_type)
            console.log(res.data.data[0].organization_type)
        }).catch((err) => {
            console.log(err)
        })
        setEventTypeId(data)
    }

    useEffect(() => {
        if(currentEventType != ""){
            handleOpenEditEventTypeModal()
        }
    },[currentEventType])

    //    

    const handleSubmitEventTypeEdit = () => {
        axios.put(config.baseurl + 'api/organization-type/'+eventTypeId, {
            organization_type: eventType
        }).then((res) => {
            console.log(res.data)
            handleCloseEditEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh+1)
        }).catch((err) => {
            console.log(err)
            handleCloseEditEventTypeModal()
            setEventTypeDataRefresh(eventTypeDataRefresh+1)
        })
    }

    const handleEventTypeDelete = (data) => {
        axios.delete(config.baseurl + 'api/organization-type/'+data).then((res) => {
            console.log(res.data)
            setEventTypeDataRefresh(eventTypeDataRefresh+1)
        }).catch((err) => {
            console.log(err)
            setEventTypeDataRefresh(eventTypeDataRefresh+1)
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
                                        <div class="col-6 d-flex align-items-center">
                                            <h6 class="mb-0">Event Type Master</h6>
                                        </div>

                                        <div class="col-6 text-end">
                                            <button type="button" href="/product/add" class="btn bg-gradient-dark" onClick={handleOpenEventTypeModal}>Create Event Type</button>
                                        </div>
                                    </div>
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
                                                                    <p>{data.organization_type}</p>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-link text-dark px-3 mb-0" id={data._id} onClick={(e) => handleEventTypeEdit(e.target.id)}><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                                    <a href="#" class="btn btn-link text-danger text-gradient px-3 mb-0" id={data._id} onClick={(e) => handleEventTypeDelete(e.target.id)}><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
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
                </div>
            </main>
        </>
    )
}

export default Product;
