import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./store.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Store =() => {
    const accesstoken = JSON.parse(localStorage.getItem('user'));    
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getStore(); 
    }, [])

    const getStore = async () =>{
        let storeresult = await fetch(config.apibaseurl+"/api/branch");
        storeresult = await storeresult.json();
        setStores(storeresult.data.results);
    }

    const [name, setLocation] = useState("");
    const [location, setAddress] = useState("");
    const [remark, setRemark] = useState("");
    const [count, setCount] = useState(1);
    const [updateid, setUpdateid] = useState("");
    const [error, setError] = useState(false);

    const handleCatsubmit= async() =>{
        if(!location || !name)
        {
            setError(true);
            return false;
        }
        let apicaturl = '';
        let methodapi = '';
        if(updateid){
            apicaturl =  config.apibaseurl+"/api/branch/"+updateid;
            methodapi = 'put';
        }  else {
            apicaturl =  config.apibaseurl+"/api/branch";
            methodapi = 'post';
        }
        
        let addstore = await fetch(apicaturl,{
          method: methodapi,
          body: JSON.stringify({name, location, remark, count}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+accesstoken.data.access_token
          }
        });
  
        addstore = await addstore.json();      
        if(addstore.status == 'true'){
            getStore();
            setLocation('');
            setAddress('');      
        }
    } 
    
    const getStoreedit = async(editid)=>{       
        let storeeditdetails = await fetch(config.apibaseurl+"/api/branch/"+editid,{
            method: 'get',
            headers:{              
                'Authorization': 'bearer '+accesstoken.data.access_token
            }   
        });
        storeeditdetails = await storeeditdetails.json();    
        setLocation(storeeditdetails.data[0].name);
        setAddress(storeeditdetails.data[0].location);
        setUpdateid(storeeditdetails.data[0]._id);
    }

    const deleteStore = async(id)=> {
        let deletest = await fetch(config.apibaseurl+"/api/branch/"+id,{
            method: 'Delete',        
            headers:{              
                'Authorization': 'bearer '+accesstoken.data.access_token
            }
        });
        deletest = await deletest.json();
        if(deletest){          
            getStore();
            setLocation('');
            setAddress('');
        }
    }

    return(
        <>
            <div class="min-height-300 bg-primary position-absolute w-100"></div>
            <Sidebar />
            <main className="main-content position-relative border-radius-lg ">
                <Header />
                <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-md-8">
                    <div class="card mb-4">
                        <div class="card-header pb-3">
                            <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                    <h6 class="mb-0">Store</h6>
                                </div>
                               
                                {/* <div class="col-6 text-end">
                                    <a href="javascript:void(0);" class="btn btn-outline-primary btn-sm mb-0 "  >Import</a> &nbsp;&nbsp;
                                    <a href="/category/add" class="btn btn-outline-primary btn-sm mb-0 ">Add New</a>
                                </div> */}
                            </div>
                        </div>

                        <div class="card-body px-0 pt-0 pb-2">
                            <div class="table-responsive p-5">
                                <table class="table align-items-center mb-0 ">
                                <thead>
                                    <tr>
                                    <th class="text-secondary opacity-7 ps-2">S.No</th>                         
                                    <th class="text-secondary opacity-7 ps-2">Details</th>
                                    <th class="text-secondary opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        stores.map( (item, index) => 
                                        <tr key={item._id}>
                                            <td>{index+1}</td>
                                            <td >
                                            <div class="d-flex px-2 py-1">                                                
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{item.name}</h6>
                                                    <p class="text-xs mb-2">Location: {item.location}</p>
                                                </div>
                                            </div>
                                            </td>                                            
                                            <td>
                                            <div class="ms-auto">
                                                <a class="btn btn-link text-dark px-3 mb-0" onClick={()=> getStoreedit(item._id)} ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                <a class="btn btn-link text-danger text-gradient px-3 mb-0" onClick={()=> deleteStore(item._id)}><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
                                            </div>
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
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <div class="card-header pb-3">
                                <div class="row">
                                    <div class="col-6 d-flex align-items-center">
                                        <h6 class="mb-0">Add/Edit Store</h6>
                                    </div>                               
                                </div>
                            </div>

                            <div class="card-body">
                           
                            <div class="row">
                                <div class="col-md-12">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Location</label>
                                    <input class="form-control" type="text" placeholder="Enter name" required value={name} onChange={(e) => { setLocation(e.target.value); }} />
                                    { error && !name && <span class="text-danger text-gradient text-xs text-secondary">Enter the Name</span> }
                                </div>
                                </div>                                
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Address</label>
                                    <textarea class="form-control" rows="5" value={location} onChange={(e) => { setAddress(e.target.value); }}></textarea>
                                    { error && !location && <span class="text-danger text-gradient text-xs text-secondary">Enter the Address</span> }
                                </div>
                                </div>                                
                            </div>
                            <div class="row">
                                <div class="text-end">
                                    <button type="button" onClick={handleCatsubmit} class="btn btn-primary btn-sm ms-auto mt-5">Submit</button>
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

export default Store;
