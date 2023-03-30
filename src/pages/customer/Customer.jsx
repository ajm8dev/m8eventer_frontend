import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./customer.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Customer =() => {

    const accesstoken = JSON.parse(localStorage.getItem('user'));    
    const [customers, setCustomers] = useState([]);
    
    const navigate = useNavigate();

    return(
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
                                    {
                                        customers.map( (item, index) => 
                                        <tr key={item._id}>
                                            <td>{index+1}</td>
                                            <td >
                                            <div class="d-flex px-2 py-1">
                                               
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-1 text-sm ">{item.name}</h6>
                                                    <p class="text-xs mb-2">Email: {item.email} </p>
                                                    <p class="text-xs mb-2">Mobile: <span class="text-secondary" >{item.phone}</span> </p>
                                                </div>
                                            </div>  
                                            </td>
                                            <td>
                                                <p class="text-xs font-weight-bold mb-0">{item.streetno} {item.streetname} {item.city} {item.pincode}</p>
                                            </td>
                                            
                                        </tr>
                                        )
                                    }                                   
                                </tbody>
                                </table>
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

export default Customer;
