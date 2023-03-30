import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./category.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Category =() => {
    const accesstoken = JSON.parse(localStorage.getItem('user'));    
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getCategory(); 
    }, [])

    const getCategory = async () =>{
        let catresult = await fetch(config.apibaseurl+"/api/category");
        catresult = await catresult.json(); 
        setCategories(catresult.data.results);    
    }

    const [name, setName] = useState("");
    const [updateid, setUpdateid] = useState("");
    const [error, setError] = useState(false);

    const handleCatsubmit= async() =>{
        if(!name)
        {
            setError(true);
            return false;
        }
        let apicaturl = '';
        let methodapi = '';
        if(updateid){
            apicaturl =  config.apibaseurl+"/api/category/"+updateid;
            methodapi = 'put';
        }  else {
            apicaturl =  config.apibaseurl+"/api/category";
            methodapi = 'post';
        }
        
        let addcat = await fetch(apicaturl,{
          method: methodapi,
          body: JSON.stringify({name}),
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+accesstoken.data.access_token
          }
        });
  
        let addcatrs = await addcat.json();      
        if(addcatrs.status == 'true'){
            getCategory();        
        }
    } 
    
    const getCategoryedit = async(editid)=>{       
        let cateditdetails = await fetch(config.apibaseurl+"/api/category/"+editid,{
            method: 'get',
            headers:{              
                'Authorization': 'bearer '+accesstoken.data.access_token
            }   
        });
        cateditdetails = await cateditdetails.json();    
        setName(cateditdetails.data[0].name);
        setUpdateid(cateditdetails.data[0]._id);
    }

    const deleteCategory = async(id)=> {
        let deletecat = await fetch(config.apibaseurl+"/api/category/"+id,{
            method: 'Delete',        
            headers:{              
                'Authorization': 'bearer '+accesstoken.data.access_token
            }
        });
        deletecat = await deletecat.json();
        if(deletecat){          
            getCategory(); 
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
                                    <h6 class="mb-0">Category</h6>
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
                                    <th class="text-secondary opacity-7 ps-2">Name</th>
                                    <th class="text-secondary opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        categories.map( (item, index) => 
                                        <tr key={item._id}>
                                            <td>{index+1}</td>
                                            <td >
                                            <div class="d-flex px-2 py-1">                                                
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-0 text-sm">{item.name}</h6>
                                                </div>
                                            </div>
                                            </td>                                            
                                            <td>
                                            <div class="ms-auto">
                                                <a class="btn btn-link text-dark px-3 mb-0" onClick={()=> getCategoryedit(item._id)} ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                               { /* <a class="btn btn-link text-danger text-gradient px-3 mb-0" onClick={()=> deleteCategory(item._id)}><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a> */ }
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
                                        <h6 class="mb-0">Add/Edit Category</h6>
                                    </div>                               
                                </div>
                            </div>

                            <div class="card-body">
                           
                            <div class="row">
                                <div class="col-md-12">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Name</label>
                                    <input class="form-control" type="text" placeholder="Enter Category name" required value={name} onChange={(e) => { setName(e.target.value); }} />
                                    { error && !name && <span class="text-danger text-gradient text-xs text-secondary">Enter the Category Name</span> }
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

export default Category;
