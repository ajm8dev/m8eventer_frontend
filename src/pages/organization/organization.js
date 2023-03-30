import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
// import "./product.scss";
import config from "../../config.json";
import { useEffect } from "react";
import customersApi from '../../services/customers'
import axios from "axios";

const Organization = () => {

    useEffect(() => {
        axios.get(customersApi.getCustomerList)
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

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
                                            <h6 class="mb-0">Organization Master</h6>
                                        </div>
                                        <div class="col-6 text-end">
                                            <button type="button" href="/product/add" class="btn bg-gradient-dark">Create Complimentry</button>
                                        </div>
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
                                                <tr>
                                                    <td>1</td>
                                                    <td >
                                                        <p>Food</p>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="btn btn-link text-success px-3 mb-0"  ><i class="fas fa-file text-success me-2" aria-hidden="true"></i>View</a>
                                                        <a href="#" class="btn btn-link text-dark px-3 mb-0"  ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                        <a class="btn btn-link text-danger text-gradient px-3 mb-0"><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td >
                                                        <p>Tea</p>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="btn btn-link text-success px-3 mb-0"  ><i class="fas fa-file text-success me-2" aria-hidden="true"></i>View</a>
                                                        <a href="#" class="btn btn-link text-dark px-3 mb-0"  ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                        <a class="btn btn-link text-danger text-gradient px-3 mb-0"><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td >
                                                        <p>Chair</p>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="btn btn-link text-success px-3 mb-0"  ><i class="fas fa-file text-success me-2" aria-hidden="true"></i>View</a>
                                                        <a href="#" class="btn btn-link text-dark px-3 mb-0"  ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                        <a class="btn btn-link text-danger text-gradient px-3 mb-0"><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td >
                                                        <p>Tables</p>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="btn btn-link text-success px-3 mb-0"  ><i class="fas fa-file text-success me-2" aria-hidden="true"></i>View</a>
                                                        <a href="#" class="btn btn-link text-dark px-3 mb-0"  ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                        <a class="btn btn-link text-danger text-gradient px-3 mb-0"><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>5</td>
                                                    <td >
                                                        <p>Pen/Pad</p>
                                                    </td>
                                                    <td>
                                                        <a href="#" class="btn btn-link text-success px-3 mb-0"  ><i class="fas fa-file text-success me-2" aria-hidden="true"></i>View</a>
                                                        <a href="#" class="btn btn-link text-dark px-3 mb-0"  ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                        <a class="btn btn-link text-danger text-gradient px-3 mb-0"><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                                    </td>
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
        </>
    )
}

export default Organization;
