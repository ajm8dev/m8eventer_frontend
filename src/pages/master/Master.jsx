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

//
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';

const Product = () => {

    const [loader, setLoader] = useState(false)
    const [show, setShow] = useState(false);

    const[uptShow, setUptShow] = useState(false)
    const[delShow, setDelShow] = useState(false)

    const [complimentary, setComplimentary] = useState('')
    const [complimentaryData, setComplimentaryData] = useState([])
    const [complimentaryDataRefresh, setComplimentaryRefresh] = useState(0)

    const handleComplimentaryCreate = () => {
        setLoader(true)
        axios.post(config.baseurl + 'api/organizer/complimentary', {
            complimentary_name: complimentary
        }).then((res) => {
            console.log(res.data)
            handleCloseComplimentaryModal()
            setComplimentaryRefresh(complimentaryDataRefresh + 1)
            setShow(true)
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            handleCloseComplimentaryModal()
            setComplimentaryRefresh(complimentaryDataRefresh + 1)
            setLoader(false)
        })
    }

    useEffect(() => {
        setLoader(true)
        axios.get(config.baseurl + 'api/organizer/complimentary'
        ).then((res) => {
            setComplimentaryData(res.data.data)
            console.log(res.data)
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }, [complimentaryDataRefresh])

    //

    const [complimentaryModal, setComplimentaryModal] = useState(false);
    const handleCloseComplimentaryModal = () => setComplimentaryModal(false);
    const handleOpenComplimentaryModal = () => setComplimentaryModal(true);

    //

    const [editComplimentaryModal, setEditComplimentaryModal] = useState(false);
    const handleCloseEditComplimentaryModal = () => setEditComplimentaryModal(false);
    const handleOpenEditComplimentaryModal = () => setEditComplimentaryModal(true);

    //

    const [deleteComplimentaryModal, setDeleteComplimentaryModal] = useState(false);
    const handleCloseDeleteComplimentaryModal = () => setDeleteComplimentaryModal(false);
    const handleOpenDeleteComplimentaryModal = () => setDeleteComplimentaryModal(true);


    //

    const [complimentaryId, setComplimentaryId] = useState('')
    const [currentComplimentary, setCurrentComplimentary] = useState('')

    // Edit Complimentary

    const handleComplimentaryEdit = (data) => {
        setLoader(true)
        setComplimentaryId(data)
        setCurrentComplimentary('')
        axios.get(config.baseurl + 'api/exhibitor-complimentary/get_complimentary/' + data).then((res) => {
            setCurrentComplimentary(res.data.data[0].complimentary_name)
            console.log(res.data.data[0].complimentary_name)
            handleOpenEditComplimentaryModal()
            setComplimentaryRefresh(complimentaryDataRefresh + 1)
            
            setLoader(false)
        }).catch((err) => {
            console.log(err)
            handleOpenEditComplimentaryModal()
            setComplimentaryRefresh(complimentaryDataRefresh + 1)
            setLoader(false)
        })
    }

    //

    const handleSubmitComplimentaryEdit = () => {
        setLoader(true)
        if (complimentaryId != "") {
            setCurrentComplimentary('')
            axios.put(config.baseurl + 'api/organizer/complimentary/' + complimentaryId, {
                complimentary_name: complimentary
            }).then((res) => {
                handleCloseEditComplimentaryModal()
                setComplimentaryRefresh(complimentaryDataRefresh + 1)
                setLoader(false)
                setUptShow(true)
            }).catch((err) => {
                console.log(err)
                handleCloseEditComplimentaryModal()
                setComplimentaryRefresh(complimentaryDataRefresh + 1)
                setLoader(false)
            })
        }
    }

    //    

    const handleComplimentaryDelete = (data) => {
        setLoader(true)
        setComplimentaryId(data)
        axios.get(config.baseurl + 'api/exhibitor-complimentary/get_complimentary/' + data).then((res) => {
            setCurrentComplimentary(res.data.data[0].complimentary_name)
            handleOpenDeleteComplimentaryModal()
            setLoader(false)
        }).catch((err) => {
            handleOpenDeleteComplimentaryModal()
            setLoader(false)
        })

    }


    const handleSubmitCompliementaryDelete = () => {
        setLoader(true)
        axios.delete(config.baseurl + 'api/exhibitor-complimentary/del_compli/' + complimentaryId).then((res) => {
            console.log(res.data)
            handleCloseDeleteComplimentaryModal()
            setComplimentaryRefresh(complimentaryDataRefresh + 1)
            setLoader(false)
            setDelShow(true)
        }).catch((err) => {
            console.log(err)
            handleCloseDeleteComplimentaryModal()
            setComplimentaryRefresh(complimentaryDataRefresh + 1)
            setLoader(false)
        })
    }

    return (
        <>

            {/* loader */}

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
                                            <h6 class="mb-0">Complimentary Master</h6>
                                        </div>

                                        <div class="col-6 text-end">
                                            { /* <a href="javascript:void(0);" class="btn btn-outline-primary btn-sm mb-0 "  >Import</a> &nbsp;&nbsp; */}
                                            {/* <a class="btn bg-gradient-dark mb-0" href="/product/add"><i class="fas fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add New Product</a> */}
                                            <button type="button" href="/product/add" class="btn bg-gradient-dark" onClick={handleOpenComplimentaryModal}>Create Complimentry</button>
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
                                                    <Toast.Body>Complimentary created successfully!</Toast.Body>
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
                                                    <Toast.Body>Complimentary updated successfully!</Toast.Body>
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
                                                    <Toast.Body>Complimentary deleted</Toast.Body>
                                                </Toast>
                                            </Col>
                                        </Row>
                                    </div>


                                </div>

                                <div class="card-body px-0 pt-0 pb-2">
                                    <div class="table-responsive p-3">
                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th class="text-secondary opacity-7 ps-2">S.No</th>
                                                    <th class="text-secondary opacity-7 ps-2">Complimentry Name</th>
                                                    <th class="text-secondary opacity-7">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {

                                                    complimentaryData.map((data, i) => {
                                                        return (

                                                            <tr>
                                                                <td>{i + 1}</td>
                                                                <td >
                                                                    <p>{data.complimentary_name}</p>
                                                                </td>
                                                                <td>
                                                                    <a href="#" class="btn btn-link text-dark px-3 mb-0" id={data._id} onClick={(e) => handleComplimentaryEdit(e.target.id)}><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                                    <a href="#" class="btn btn-link text-danger text-gradient px-3 mb-0" id={data._id} onClick={(e) => handleComplimentaryDelete(e.target.id)}><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
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

                    <Modal show={complimentaryModal} onHide={handleCloseComplimentaryModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create Complimentary</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="row">
                                <div class="col-xl-12">
                                    <input type="text" class="form-control" placeholder="Complimentry name" onChange={(e) => setComplimentary(e.target.value)}></input>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseComplimentaryModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleComplimentaryCreate}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Edit Event Modal */}

                    <Modal show={editComplimentaryModal} onHide={handleOpenEditComplimentaryModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Complimentary</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div class="row">
                                <div class="col-xl-12">
                                    <input type="text" class="form-control" defaultValue={currentComplimentary} placeholder="Complimentry name" onChange={(e) => setComplimentary(e.target.value)}></input>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditComplimentaryModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmitComplimentaryEdit}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Delete Event Modal */}

                    <Modal show={deleteComplimentaryModal} onHide={handleCloseDeleteComplimentaryModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete Complementary</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{currentComplimentary}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDeleteComplimentaryModal}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSubmitCompliementaryDelete}>
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
