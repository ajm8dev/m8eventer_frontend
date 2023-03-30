import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./product.scss";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config.json";

import { useState, useEffect } from "react";

import axios from 'axios';

const Productedit =() => {
    const accesstoken = JSON.parse(localStorage.getItem('user'));    
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getCategory(); 
        getProductedit();
    }, [])

    const [category_id, setCategory] = useState("");
    const [title, setTitle] = useState("");
    const [skuid, setSkuid] = useState("");
    const [product, setProduct] = useState("");
    const [remark, setRemark] = useState("");
    const [carrot, setCarrot] = useState("");
    const [wastage, setWastage] = useState("");
    const [making, setMaking] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [imagepreview, setImagepreview] = useState("");
    const [imagede, setImagede] = useState("");
    const [editimg, setImageedit] = useState("");

    const [updateid, setUpdateid] = useState("");
    const [error, setError] = useState(false);
    const params = useParams();

   

    const getCategory = async () =>{
        let catresult = await fetch(config.apibaseurl+"/api/category");
        catresult = await catresult.json(); 
        setCategories(catresult.data.results);
    }

    const getProductedit = async()=>{       
        let proeditdetails = await fetch(config.apibaseurl+"/api/product/"+params.editid,{
            method: 'get',
            headers:{              
                'Authorization': 'bearer '+accesstoken.data.access_token
            }   
        });
        proeditdetails = await proeditdetails.json();    
        setCategory(proeditdetails.data[0].category_id);
        setTitle(proeditdetails.data[0].title);
        setSkuid(proeditdetails.data[0].skuid);
        setProduct(proeditdetails.data[0].product); 
        setRemark(proeditdetails.data[0].remark); 
        setCarrot(proeditdetails.data[0].carrot); 
        setWastage(proeditdetails.data[0].wastage); 
        setMaking(proeditdetails.data[0].making); 
        setPrice(proeditdetails.data[0].price);
        setImageedit(proeditdetails.data[0].image); 
                
        if(params){
            setImagepreview(config.apibaseurl+'/'+proeditdetails.data[0].image);
        }
    }

    const handlecategory= async(event) =>{
        setCategory(event.target.value);
    }

    const handleImageupload= async(event) =>{       
        const fileup = event.target.files[0];
        Transformfile(fileup);
    }

    const Transformfile = (file) => {
        const reader = new FileReader();
        if(file) {
            reader.readAsDataURL(file);
            reader.onloadend = ()=>{
                setImage(file.name);
                setImagepreview(reader.result);
                setImagede(file);
            } 
        } else {
            setImage('');
            setImagepreview('');
            setImagede('');
        }
    } 
    
    const submitProductDetails = async (res)=>{

        const editupdateurl = config.apibaseurl+"/api/product/"+params.editid;
        const configdata = {
            headers: {      
              'Content-Type': 'application/json',
              'Authorization': 'bearer '+accesstoken.data.access_token     
            },      
        };

        const ondataSuccess = (response)=>{
            navigate('/product');
        }
        const ondataFailure = (err)=>(
            console.log(err)
        )        
        const editdata = {
            'category_id' : category_id,
            'title' : title,
            'skuid' : skuid,
            'product' : product,
            'remark' : remark,
            'carrot' : carrot,
            'wastage' : wastage,
            'making' : making,
            'image' : res,
            'price' : price,
        }                
        axios.put(editupdateurl, editdata, configdata).then(ondataSuccess, ondataFailure); 
    }

    const handleProsubmit= async() =>{
        if(!category_id || !title || !skuid || !carrot || !wastage || !making || !price)
        {
            setError(true);
            return false;
        }
        /*Image Upload process here */
        if(imagede){           
            const imageupurl = config.apibaseurl+"/api/upload/upload-single";
            const configimg = {
                headers: {      
                'content-type': 'multipart/form-data', 
                'Authorization': 'bearer '+accesstoken.data.access_token     
                },      
            };
            const formData = new FormData();
            formData.append('file', imagede);

            const onSuccess = (response)=>{
                submitProductDetails(response.data.data.filename)
            }
            const onFailure = (err)=>(
                console.log(err)
            )
            axios.post(imageupurl, formData, configimg).then(onSuccess, onFailure)
        } else {           
            submitProductDetails(editimg);
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
                                    <h6 class="mb-0">Edit Product</h6>
                                </div>                               
                            </div>
                        </div>

                        <div class="card-body">                        
                        <div class="row">
                            <div class="col-md-4">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label">Category</label>
                                <select class="form-control" value={category_id} onChange={(event)=> handlecategory(event)}>
                                    <option> Choose </option>
                                    {
                                        categories.map( (item, index) => 
                                            <option value={item._id}>{item.name}</option>
                                        )
                                    }      
                                </select>
                                { error && !category_id && <span class="text-danger text-gradient text-xs text-secondary">Choose the Category Name</span> }                                  
                            </div>
                            </div>
                            <div class="col-md-4">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label">Title</label>
                                <input class="form-control" type="text" value={title} onChange={(e) => { setTitle(e.target.value); }} />
                                { error && !title && <span class="text-danger text-gradient text-xs text-secondary">Enter the product title</span> }
                            </div>
                            </div>
                            <div class="col-md-4">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label">SKU</label>
                                <input class="form-control" type="text" value={skuid} onChange={(e) => { setSkuid(e.target.value); }} />
                                { error && !skuid && <span class="text-danger text-gradient text-xs text-secondary">Enter the SKU code</span> } 
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Carat</label>
                                    <input class="form-control" type="text" value={carrot} onChange={(e) => { setCarrot(e.target.value); }}  />
                                    { error && !carrot && <span class="text-danger text-gradient text-xs text-secondary">Enter the Carat value</span> } 
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Wastage</label>
                                    <input class="form-control" type="text" value={wastage} onChange={(e) => { setWastage(e.target.value); }}  />
                                    { error && !wastage && <span class="text-danger text-gradient text-xs text-secondary">Enter the Carat value</span> } 
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Making</label>
                                    <input class="form-control" type="text" value={making} onChange={(e) => { setMaking(e.target.value); }}  />
                                    { error && !making && <span class="text-danger text-gradient text-xs text-secondary">Enter the Carat value</span> }
                                    
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Price</label>
                                    <input class="form-control" type="text" value={price} onChange={(e) => { setPrice(e.target.value); }}  />
                                    { error && !price && <span class="text-danger text-gradient text-xs text-secondary">Enter the Carat value</span> }
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Image</label>
                                    <input class="form-control" type="file" onChange={(event)=> handleImageupload(event)}  />
                                </div>
                            </div>
                            {imagepreview ?
                                <div class="col-md-6">
                                    {
                                        <img src={imagepreview} width="150" height="150" />
                                    }
                                </div>
                            : null }
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label">Description</label>
                                <textarea class="form-control" rows="5" value={product} onChange={(e) => { setProduct(e.target.value); }}></textarea>
                            </div>
                            </div>
                            <div class="col-md-6">
                            <div class="form-group">
                                <label for="example-text-input" class="form-control-label">Remarks</label>
                                <textarea class="form-control" rows="5" value={remark} onChange={(e) => { setRemark(e.target.value); }}></textarea>
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="text-end">
                                <button type="button" onClick={handleProsubmit} class="btn btn-primary btn-sm ms-auto mt-5">Update</button>
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

export default Productedit;
