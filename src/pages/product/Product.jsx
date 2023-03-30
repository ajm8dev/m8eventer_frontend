import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./product.scss";
import config from "../../config.json";

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Product =() => {
    const accesstoken = JSON.parse(localStorage.getItem('user'));    
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();
    useEffect(() => {
        getProducts();        
    }, [])

    const getProducts = async () =>{
        let prodresult = await fetch(config.apibaseurl+"/api/product");
        prodresult = await prodresult.json(); 
        setProducts(prodresult.data.results);
    } 

    const deleteProduct = async(id)=> {
        let deletecat = await fetch(config.apibaseurl+"/api/product/"+id,{
            method: 'Delete',        
            headers:{              
                'Authorization': 'bearer '+accesstoken.data.access_token
            }
        });
        deletecat = await deletecat.json();
        if(deletecat){          
            getProducts(); 
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
                    <div class="col-12">
                    <div class="card mb-4">
                        <div class="card-header pb-3">
                            <div class="row">
                                <div class="col-6 d-flex align-items-center">
                                    <h6 class="mb-0">Products</h6>
                                </div>
                               
                                <div class="col-6 text-end">
                                    { /* <a href="javascript:void(0);" class="btn btn-outline-primary btn-sm mb-0 "  >Import</a> &nbsp;&nbsp; */ }
                                    <a class="btn bg-gradient-dark mb-0" href="/product/add"><i class="fas fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;Add New Product</a>
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
                                    {/* <th class="text-secondary opacity-7 ps-2">Category</th> */}
                                    <th class="text-secondary opacity-7">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products.map( (item, index) => 
                                        <tr key={item._id}>
                                            <td>{index+1}</td>
                                            <td >
                                            <div class="d-flex px-2 py-1">
                                                <div>
                                                    <img src={config.baseurl+item.image} class="avatar avatar-sm me-3" alt={item.title} />
                                                </div>
                                                <div class="d-flex flex-column justify-content-center">
                                                    <h6 class="mb-1 text-sm ">{item.title}</h6>
                                                    <p class="text-xs mb-2">Carat: {item.carrot} &nbsp; Wastage: {item.wastage} &nbsp; Making: {item.making} &nbsp;</p>
                                                    <p class="text-xs mb-2">Remarks: <span class="text-secondary" >{item.remark}</span> </p>
                                                    <p class="text-xs mb-0">Price: <span class="text-dark font-weight-bold ms-sm-2" >{item.price}</span> </p>
                                                </div>
                                            </div>  
                                            </td>
                                            {/* <td>
                                                <p class="text-xs font-weight-bold mb-0">{item.category_id.name}</p>
                                                <p class="text-xs text-secondary mb-0">{item.product}</p>
                                            </td> */}
                                            <td>
                                                <a href={'/product/edit/'+item._id} class="btn btn-link text-dark px-3 mb-0"  ><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i>Edit</a>
                                                <a class="btn btn-link text-danger text-gradient px-3 mb-0" onClick={()=> deleteProduct(item._id)}><i class="far fa-trash-alt me-2" aria-hidden="true"></i>Delete</a>
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

export default Product;
