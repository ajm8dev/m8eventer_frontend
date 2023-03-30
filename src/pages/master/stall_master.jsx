import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
// import "./product.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const MasterStall = () => {

    let superArr = []

    const [totalPriceValue, setTotalPriceValue] = useState(0)

    const handleChangeSinglePost = (value, id) => {
        console.log("value>>>",value);
        console.log("id>>>",id);
        var widthVal = document.querySelector("input[name='width"+id+"']");
        var heightVal = document.querySelector("input[name='height"+id+"']");
        var priceVal = document.querySelector("input[name='price"+id+"']");
        priceVal.value = ((widthVal.value * heightVal.value) * 750 ) /  100

        var totalPriceVal = 0
        for(var i = 1; i <= 2; i++){
          var totalPriceValCalc = document.querySelector("input[name='price"+i+"']");
          totalPriceVal = totalPriceVal + parseFloat(totalPriceValCalc.value)
          if(totalPriceValCalc.value != 0){
            setTotalPriceValue(parseInt(totalPriceVal))
          }
        }
    }
    const showValue = () => {
        console.log(superArr)
    }


    const submValue = () => {
        superArr = []
        for(let i = 1; i <= 2; i++){
            var widthVal = document.querySelector("input[name='width"+i+"']");
            var heightVal = document.querySelector("input[name='height"+i+"']");
            var priceVal = document.querySelector("input[name='price"+i+"']");
            console.log(widthVal.value, heightVal.value, priceVal.value)
            superArr.push({
                id: widthVal.id,
                width: widthVal.value,
                height: heightVal.value,
                price : priceVal.value
            })
        }
      
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
                                            <h6 class="mb-0">Stall Master</h6>
                                        </div>

                                        <div class="col-6 text-end">
                                            { /* <a href="javascript:void(0);" class="btn btn-outline-primary btn-sm mb-0 "  >Import</a> &nbsp;&nbsp; */}
                                            {/* <a class="btn bg-gradient-dark mb-0" href="/product/add"><i class="fas fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add New Product</a> */}
                                            <button type="button" href="/product/add" class="btn bg-gradient-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Stall</button>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-body px-0 pt-0 pb-2">
                                    <div class="table-responsive p-3">
                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                    <th class="text-secondary opacity-7 ps-2">S.No</th>
                                                    <th class="text-secondary opacity-7 ps-2">Stall Master Name</th>
                                                    <th class="text-secondary opacity-7 ps-2">Total Stalls</th>
                                                    <th class="text-secondary opacity-7">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                    <td>1</td>
                                                    <td><p>Layout 1</p></td>
                                                    <td>32</td>
                                                    <td>
                                                        <a href="#" class="btn btn-link text-success px-3 mb-0"  ><i class="fas fa-file text-success me-2" aria-hidden="true"></i>View</a>
                                                        <a href="#" class="btn btn-link text-dark px-3 mb-0"  ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                        <a class="btn btn-link text-danger text-gradient px-3 mb-0"><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td><p>Layout 2</p></td>
                                                    <td>42</td>
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

                    {/* Event Modal */}
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Create Stall</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="row">
                                        <div class="col-xl-12">
                                            <input type="text" class="form-control" placeholder="Layout Name"></input>
                                            <input type="text" class="form-control mt-3" placeholder="Total Stalls"></input>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#stallCreationModal">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stall Creation */}

                    <div class="modal fade" id="stallCreationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content p-3">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Stall Creation</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="row">
                                    <div class="col-xl-12">
                                        <div class="modal-body">

                                            <div class="alert alert-warning d-flex align-items-center" role="alert">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                                                    <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                                </svg>
                                                <div>
                                                    <p class="alert-para mb-0">Note: Totally 40 Stalls Created, In Default Undefined Stalls are Not Available For Further Process</p>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-xl-4">
                                                    <input class="form-control mb-2 mx-2" placeholder="layout" value="Layout-1"></input>
                                                </div>
                                            </div>
                                            {/*  */}

                                            <div class="stall-box">
                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="1"></input>
                                                    <input id="1" class="form-control mb-2 mx-2" placeholder="width" name="width1" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="1" class="form-control mb-2 mx-2" placeholder="height" name="height1" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="1" class="form-control mb-2" type="number" name="price1" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="2"></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="width" name="width2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="height" name="height2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="2" class="form-control mb-2" type="number" name="price2" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="2"></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="width" name="width2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="height" name="height2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="2" class="form-control mb-2" type="number" name="price2" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="2"></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="width" name="width2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="height" name="height2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="2" class="form-control mb-2" type="number" name="price2" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="2"></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="width" name="width2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="height" name="height2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="2" class="form-control mb-2" type="number" name="price2" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="2"></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="width" name="width2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="height" name="height2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="2" class="form-control mb-2" type="number" name="price2" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="2"></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="width" name="width2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="height" name="height2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="2" class="form-control mb-2" type="number" name="price2" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>

                                                <div class="d-flex mt-3">
                                                <input class="form-control mb-2 mx-2" placeholder="stall no" value="2"></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="width" name="width2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <input id="2" class="form-control mb-2 mx-2" placeholder="height" name="height2" onChange={(e) => {handleChangeSinglePost(e.target.value, e.target.id)}}></input>
                                                    <div class="input-group">
                                                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                                                        <input id="2" class="form-control mb-2" type="number" name="price2" aria-label="Price" aria-describedby="price-batch" disabled></input>
                                                    </div>
                                                
                                                    <div class="form-check form-switch mx-2">
                                                        <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row mt-5">
                                                <div class="col-xl-12">
                                                <div class="alert alert-warning para-all-fff" role="alert">
                                                 <p class="mb-0">Total Stalls Created, 39</p>
                                                 <p class="mb-0">Total Stalls Allocated, 24</p>
                                                 <p class="mb-0">Un Allocated Stalls, 24</p> 
                                                 <p class="mb-0">Total Sq Occupied 3400 sq</p> 
                                                 <p class="mb-0">Total Price, ₹ {totalPriceValue}</p>    
                                                </div>
                                                </div>
                                            </div>

                                            {/* <button type="button" class="btn btn-primary mt-2">Add More</button> */}
                                        </div>
                                        
                                    </div>
                                    
                                </div> 
                                <div class="modal-footer">
                                    {/* <button type="button" class="btn btn-primary" onClick={showValue}>Show Value</button> */}
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-dark" onClick={submValue}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default MasterStall;
