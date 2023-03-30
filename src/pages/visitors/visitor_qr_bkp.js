import { useRef, useState, useEffect } from "react";
import "./visitors.css";
import config from "../../config.json";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import React from "react";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';


const Visitors = () => {
    
    const userRef = useRef();
    const errRef = useRef();

    let navigate = useNavigate();

    const { id } = useParams();
    const { name } = useParams()
    const { organization } = useParams()

    const { event_date } = useParams()
    const { event_location } = useParams()
    const { event_time } = useParams()


    const backRegBtn = () => {
        navigate('/visitor-registration')
    }

    const prntBtn = () => {
        window.print();
    }

    const componentRef = useRef();

    return (
        <>
            <main class="main-content  mt-0">
                <div class="page-header min-vh-100">
                    <div class="container">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6 col-md-6 d-flex flex-column mx-lg-0 mx-auto">
                                <div class="card card-plain" ref={componentRef}>
                                    <div class="card-body" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '184px'}}>
                                        <div>
                                            <div>
                                                <p style={{ fontSize: '16px', marginBottom: '2px', fontWeight: 'bold' }}>6 - 8 JAN, 2023</p>
                                                <p style={{ fontSize: '16px', marginBottom: '2px',  fontWeight: 'bold' }}>THE RESIDENCY TOWERS, COIMBATORE</p>
                                                <p style={{ fontSize: '16px', marginBottom: '2px',  fontWeight: 'bold' }}>TIME: 11AM - 8 PM </p>
                                                <h2 style={{ textTransform: 'capitalize', marginTop: '10px',fontSize: '28px' }}>{name}</h2>
                                                <h5>{organization}</h5>
                                                <div style={{ height: "auto", marginTop: '20px'}}>
                                                    <QRCode
                                                        size={125}
                                                        value={id}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">

                                <div class="d-flex m-3 px-2">
                                    <button class="btn btn-primary mt-2" onClick={() => navigate(-1)}>Back to registration</button>

                                    <ReactToPrint
                                        trigger={() => <button class="btn btn-secondary mx-2 mt-2">print</button>}
                                        content={() => componentRef.current}
                                    />

                                </div>
                                <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden loginbgscreen" >
                                    <span class="mask bg-primary opacity-6"></span>
                                    {/* <button class="btn btn-primary">New One</button> */}
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