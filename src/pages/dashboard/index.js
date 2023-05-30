import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
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

//

import Spinner from 'react-bootstrap/Spinner';


const Product = () => {

    return (
        <>

            <div class="min-height-300 bg-primary position-absolute w-100"></div>
            <Sidebar />
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <div class="container-fluid py-4">
                    <div class="row">
                        <div class="col-xl-12">
                           <div class="card" style={{height: '100vh'}}>
                             <div class="card-body">
                                <div class="col-xl-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5>Welcome Mr.Aj</h5>
                                            </div>
                                        </div>
                                </div>
                                <div class="row mt-5">
                                    <div class="col-xl-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5>Total Users</h5>
                                                <h2>05</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5>Total Visitors</h5>
                                                <h2>21</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5>Total Exhibitors</h5>
                                                <h2>18</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 mt-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5>Total Events</h5>
                                                <h2>05</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-4 mt-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h5>Total Stalls</h5>
                                                <h2>18</h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-6 mt-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4>Upcoming Events</h4>
                                                <h5>12/07/2023</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-xl-6 mt-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4>Past Events</h4>
                                                <h5>12/07/2023</h5>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                             </div>
                           </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Product;
