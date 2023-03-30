import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/headerbar/Header";
import "./event.scss";
import config from "../../config.json";
import { useState, useEffect } from "react";
import { useMatch, useNavigate } from 'react-router-dom';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import LogRocket from 'logrocket';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { data } from "jquery";
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


LogRocket.init('woh5fz/test-project');

const EventEdit = () => {

    const [loader, setLoader] = useState(false)

    const { mainEventId } = useParams();

    // Get Event Basic Details By Id
    const [eventData, setEventData] = useState([])
    const [eventName, setEventName] = useState('')
    const [eventDatesFrom, setEventDatesFrom] = useState('')
    const [eventDatesTo, setEventDatesTo] = useState('')
    const [location, setLocation] = useState('')
    const [eventType, setEventType] = useState('')
    const [additionalInformation, setAdditionalInformation] = useState('')
    const [totalStalls, setTotalStalls] = useState('')
    const [stallSqftPrice, setStallSqPrice] = useState('')
    const [simpleStallSqFtPrice, setSimpleStallSqFtPrice] = useState('')

    //
    const [eventEndDatPikr, setEventEndDatPikr] = useState(new Date())
    const [eventStartDatPikr, setEventStartDatPikr] = useState(new Date())

    useEffect(() => {
        setLoader(true)
        axios.get(config.baseurl + 'api/organizer/event/' + '/' + mainEventId)
            .then((res) => {
                localStorage.setItem('stall_sq_fr_price', " ")
                console.log('the_mass_event_data', res.data.data)
                console.log('stall_sq_ft_price', res.data.data.stall_sq_ft_price)
                setEventData(res.data.data)
                setEventName(res.data.data.expo_name)
                setEventDatesFrom(res.data.data.expo_from_date)

                if (res.data.data.expo_from_date != 0 || res.data.data.expo_from_date != "") {
                    const startEventDat = { time: res.data.data.expo_from_date };
                    console.log('event start date ' + new Date(startEventDat.time).toLocaleDateString()); // 12/8/2021
                    //setEventStartDatPikr(new Date(new Date(startEventDat.time).toLocaleDateString()))
                }
                setEventDatesTo(res.data.data.expo_to_date)

                if (res.data.data.expo_to_date != 0 || res.data.data.expo_to_date != "") {
                    const endEventDat = { time: res.data.data.event_to_date };
                    console.log('event end date ' + new Date(endEventDat.time).toLocaleDateString()); // 12/8/2021
                    //setEventEndDatPikr(new Date(new Date(endEventDat.time).toLocaleDateString()))
                }

                setLocation(res.data.data.venue)
                setEventType(res.data.data.event_type)
                setTotalStalls(res.data.data.total_stall)
                setStallSqPrice(res.data.data.stall_sq_ft_price)
                localStorage.setItem('stall_sq_fr_price', res.data.data.stall_sq_ft_price)
                setAdditionalInformation(res.data.data.description)
                setSimpleStallSqFtPrice(55)
                setLoader(false)
            })
            .catch((err) => {
                console.log(err)
                setLoader(false)
            })
    }, [])

    // Get Event Type 

    const [eventTypeList, setEventTypeList] = useState([])

    useEffect(() => {
        axios.get(config.baseurl + 'api/organizer/event-type')
            .then((res) => {
                console.log(res.data)
                setEventTypeList(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    /*

    Get Event Stalls

    */

    const [stallsData, setStallsData] = useState([])

    const [stallRefresh, setStallRefresh] = useState(false)

    useEffect(() => {
        setStallsData([])
        axios.get(config.baseurl + 'api/event-stalls/get_fr_event' + '/' + mainEventId)
            .then((res) => {
                console.log('stalls_data', res.data)
                let superArr = []
                let superCount = 1
                for (let i = 0; i < res.data.data.length; i++) {
                    superArr.push(
                     <div class="stall-layout-box">
                        <div class="d-flex">
                            <img src="../../assets/img/small-logos/stall_img_png2.png" class="" alt="main_logo" style={{width: '25px', height: '25px'}}/><p style={{marginBottom: 0}}>  &nbsp;&nbsp;{superCount}</p>
                        </div>
                        <p class="mb-0" style={{marginTop: '10px'}}>{res.data.data[i].width + 'X' + res.data.data[i].height}</p><div>
                        <p class="mb-0 stall-count">{res.data.data[i].price}</p></div>
                    </div>)
                    superCount++
                }
                setStallsData(superArr)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [stallRefresh])





    // Get Event Gallery Images

    const [galleryImagesData, setGalleryImagesData] = useState([])

    const [galleryImgRefresh, setGalleryImgRefresh] = useState(0)

    useEffect(() => {
        axios.get(config.baseurl + 'api/event-gallery-images/' + '/' + mainEventId)
            .then((res) => {
                console.log(res.data)
                setGalleryImagesData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [galleryImgRefresh])

    const [eventLogoImages, setEventLogoImgagesData] = useState([])
    const [eventLogoImagesRefresh, setEventLogoImagesRefresh] = useState(0)

    useEffect(() => {
        axios.get(config.baseurl + 'api/event-logo/' + '/' + mainEventId)
            .then((res) => {
                console.log(res.data)
                setEventLogoImgagesData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [eventLogoImagesRefresh])

    // Get Complimentary Data

    const [complimentaryData, setComplimentaryData] = useState([])
    const [complimentaryDataRefreshRefre, setComplimentaryDataRefreshRefre] = useState(0)

    useEffect(() => {
        axios.get(config.baseurl + 'api/organizer/complimentary-data' + '/' + mainEventId)
            .then((res) => {
                console.log(res.data)
                console.log('The complimentary data ', res.data)
                setComplimentaryData(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [complimentaryDataRefreshRefre])

    //
    const [updateEventModl, setUpdateEventModl] = useState(false);
    const handleUpdateEventModlClose = () => setUpdateEventModl(false);
    const handleUpdateEventModlShow = () => setUpdateEventModl(true);

    // Update Event Details Modal

    const submtEventDetails = () => {
        axios.put(config.baseurl + 'api/organizer/event' + '/' + mainEventId, {
            event_name: eventName,
            event_from_date: eventStartDatPikr,
            event_to_date: eventEndDatPikr,
            event_type: eventType,
            event_venue: location,
            total_stall: totalStalls,
            stall_sq_ft_price: stallSqftPrice,
            event_description: additionalInformation
        }).then((res) => {
            console.log(res.data)
            handleUpdateEventModlClose()
        }).catch((err) => {
            console.log(err)
        })
    }

    const [updateEventStallModl, setUpdateEventStallModl] = useState(false);
    const handleUpdateEventStallModlClose = () => setUpdateEventStallModl(false);
    const handleUpdateEventStallModlShow = () => setUpdateEventStallModl(true);

    const [eventStallsData, setEventStallsData] = useState([])

    const handleUpdateStallsBtn = () => {

        setLoader(true)

        setEventStallsData([])
        setExtraEventStallData([])

        axios.get(config.baseurl + 'api/event-stalls/get_fr_event' + '/' + mainEventId)
        .then((res) => {
            let superArr = []
            setEventStallsLength(res.data.data.length)
            let superCount = 1
            for (let i = 0; i < res.data.data.length; i++) {
                superArr.push(<div class="d-flex">
                    <input class="form-control mb-2 mx-2" placeholder="stall no" defaultValue={res.data.data[i].stall_no} disabled></input>
                    <input id={superCount} class="form-control mb-2 mx-2" placeholder="width" type="number" name={"width-" + superCount} defaultValue={res.data.data[i].width} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                    <input id={superCount} class="form-control mb-2 mx-2" placeholder="height" type="number" name={"height-" + superCount} defaultValue={res.data.data[i].height} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                    <div class="input-group">
                        <span class="input-group-text mb-2" id="price-batch">₹</span>
                        <input id={superCount} class="form-control mb-2" type="number" aria-label="Price" name={"price-" + superCount} aria-describedby="price-batch" defaultValue={res.data.data[i]?.price} disabled></input>
                    </div>
                </div>
                )
                superCount++
            }
            setEventStallsData(superArr)
            handleUpdateEventStallModlShow()
            setLoader(false)
        })

        .catch((err) => {
            console.log(err)
            setLoader(false)
        })
    }


    // Get Stalls For Event

   
    const [eventStallsLength, setEventStallsLength] = useState(0)

    useEffect(() => {
        axios.get(config.baseurl + 'api/event-stalls/get_fr_event' + '/' + mainEventId)
            .then((res) => {
                let superArr = []
                setEventStallsLength(res.data.data.length)
                let superCount = 1
                for (let i = 0; i < res.data.data.length; i++) {
                    superArr.push(<div class="d-flex">
                        <input class="form-control mb-2 mx-2" placeholder="stall no" defaultValue={res.data.data[i].stall_no} disabled></input>
                        <input id={superCount} class="form-control mb-2 mx-2" placeholder="width" type="number" name={"width-" + superCount} defaultValue={res.data.data[i].width} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                        <input id={superCount} class="form-control mb-2 mx-2" placeholder="height" type="number" name={"height-" + superCount} defaultValue={res.data.data[i].height} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                        <div class="input-group">
                            <span class="input-group-text mb-2" id="price-batch">₹</span>
                            <input id={superCount} class="form-control mb-2" type="number" aria-label="Price" name={"price-" + superCount} aria-describedby="price-batch" defaultValue={res.data.data[i]?.price} disabled></input>
                        </div>
                    </div>
                    )
                    superCount++
                }
                setEventStallsData(superArr)
            })

            .catch((err) => {
                console.log(err)
            })
    }, [stallRefresh])

    const getRandomValue = () => {
        console.log(totalStallPlusExtra)
    }

    const [extraEventStallData, setExtraEventStallData] = useState([])
    const [extraEventStallCount, setExtraEventStallCount] = useState(0)
    const [totalStallPlusExtra, setTotalStallPlusExtra] = useState('')

    const setExtraEventStallFunction = () => {
        if (extraEventStallCount >= 0) {
            let stallLength = eventStallsLength
            let stallLen = eventStallsLength
            console.log('event stall ll', eventStallsLength)
            let superArr = []
            stallLen = (parseInt(stallLen) + 1)
            for (let i = 0; i < extraEventStallCount; i++) {
                stallLength++

                superArr.push(
                    <div class="d-flex">
                        <input class="form-control mb-2 mx-2" placeholder="stall no" defaultValue={stallLen} disabled></input>
                        <input id={stallLen} class="form-control mb-2 mx-2" placeholder="width" type="number" name={"width-" + stallLen} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                        <input id={stallLen} class="form-control mb-2 mx-2" placeholder="height" type="number" name={"height-" + stallLen} onChange={(e) => { handleChangeSinglePost(e.target.value, e.target.id) }}></input>
                        <div class="input-group">
                            <span class="input-group-text mb-2" id="price-batch">₹</span>
                            <input id={stallLen} class="form-control mb-2" type="number" aria-label="Price" name={"price-" + stallLen} aria-describedby="price-batch" disabled></input>
                        </div>
                    </div>
                )
                stallLen++
            }
            let totalStallCount = parseInt(eventStallsLength) + parseInt(extraEventStallCount)

            setTotalStallPlusExtra(totalStallCount)
            setExtraEventStallData(superArr)
        }
    }


    // Stall Update

    const [allStallData, setAllStallData] = useState([])

    

    const submtStallUpdate = () => {

        setLoader(true)

        if (totalStallPlusExtra != "") {
            console.log('total stalls', totalStallPlusExtra)
            let superArr = []
            for (let i = 1; i <= totalStallPlusExtra; i++) {
                var widthVal = document.querySelector("input[name='width-" + i + "']");
                var heightVal = document.querySelector("input[name='height-" + i + "']");
                var priceVal = document.querySelector("input[name='price-" + i + "']");
            
                    superArr.push({
                        stall_no: widthVal.id,
                        width: widthVal.value,
                        height: heightVal.value,
                        price: priceVal.value
                    })
                
            }
            setAllStallData(superArr)
            
        } else {
            console.log('total stalls', eventStallsLength)
            let superArr = []
            for (let i = 1; i <= eventStallsLength; i++) {
                var widthVal = document.querySelector("input[name='width-" + i + "']");
                var heightVal = document.querySelector("input[name='height-" + i + "']");
                var priceVal = document.querySelector("input[name='price-" + i + "']");
                    superArr.push({
                        stall_no: widthVal.id,
                        width: widthVal.value,
                        height: heightVal.value,
                        price: priceVal.value
                    })
                
            }
            setAllStallData(superArr)
        }
    }

    //

    useEffect(() => {
        if (allStallData != "") {
            console.log(allStallData)
            axios.put(config.baseurl + 'api/event-stalls/update_fr_event/' + mainEventId, {
                "event_id": mainEventId,
                "stall_data": allStallData
            }).then((res) => {
                console.log('stalls update ', res.data)
                setStallRefresh(prevValue => !prevValue);
                handleUpdateEventStallModlClose()
                setLoader(false)
            }).catch((err) => {
                console.log(err)
                setStallRefresh(prevValue => !prevValue);
                setLoader(false)
            })
        }
    }, [allStallData])

    // Stalls Edit Modal

    const [galleryImageId, setGalleryImageId] = useState(0)
    const [eventGalleryImagesFile, setEventGalleryImagesFile] = useState('')

    const handleEventGalleryImages = (event) => {
        setEventGalleryImagesFile(event.target.files)
        console.log(eventGalleryImagesFile)
    }

    const galleryImageEdit = (data) => {
        if (data != "") {
            console.log(data)
            handleShowGalleryImagesModal()
            setGalleryImageId(data)
        }
    }

    const galleryImageDelete = (data) => {
        // console.log(value, id)
        if (data != "") {
            console.log(data)
            setGalleryImageId(data)
            handleShowGalleryImageDelModl()
        }
    }

    //Gallery Images Modal

    const [galleryImageModal, setGalleryImagesModal] = useState(false);

    const handleCloseGalleryImagesModal = () => setGalleryImagesModal(false);
    const handleShowGalleryImagesModal = () => setGalleryImagesModal(true);


    const submitGalleryImagesReplace = () => {
        let gallery_image_id = galleryImageId
        console.log(mainEventId, gallery_image_id)
        const formData = new FormData();
        for (var i = 0; i < eventGalleryImagesFile.length; i++) {
            console.log(eventGalleryImagesFile[i]);
            formData.append("event_gallery_images", eventGalleryImagesFile[i])
        }

        formData.append("event_id", mainEventId)
        formData.append("gallery_image_id", gallery_image_id)

        try {
            let response = axios({
                method: "post",
                data: formData,
                url: config.baseurl + 'api/event-gallery-images' + '/' + mainEventId,
                headers: { "Content-Type": "multipart/form-data" }
            }).then((res) => {
                console.log(res.data)
                setGalleryImgRefresh((parseInt(galleryImgRefresh) + 1))
                handleCloseGalleryImagesModal()
            }).catch((err) => {
                console.log(err)
                handleCloseGalleryImagesModal()
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Gallery Images Delete Modal

    const [galleryImagesDelModal, setGalleryImagesDelModal] = useState(false);
    const handleCloseGalleryImageDelModl = () => setGalleryImagesDelModal(false);
    const handleShowGalleryImageDelModl = () => setGalleryImagesDelModal(true);

    // Delete Gallery Images

    const submitGalleryImagesDelete = () => {
        let gallery_image_id = galleryImageId
        console.log(gallery_image_id, mainEventId)
        axios.delete(config.baseurl + 'api/event-gallery-images', {
            data: {
                gallery_image_id: gallery_image_id,
                event_id: mainEventId
            }
        }).then((res) => {
            console.log(res.data)
            handleCloseGalleryImageDelModl()
            setGalleryImgRefresh((parseInt(galleryImgRefresh) + 1))
        }).catch((err) => {
            console.log(err)
            handleCloseGalleryImageDelModl()
        })
    }


    // Gallery Images Add Modal Config

    const [eventGalleryImagesAddMdle, setEventGalleryImagesAddMdle] = useState(false)
    const handleCloseEventGalleryImagesAddMdle = () => setEventGalleryImagesAddMdle(false);
    const handleShowEventGalleryImagesAddmdle = () => setEventGalleryImagesAddMdle(true);

    // Gallery Images Add Modal

    const submtGalleryImagesAdd = () => {
        console.log(mainEventId)
        const formData = new FormData();
        for (var i = 0; i < eventGalleryImagesFile.length; i++) {
            console.log(eventGalleryImagesFile[i]);
            formData.append("event_gallery_images", eventGalleryImagesFile[i])
        }
        formData.append("event_id", mainEventId)
        try {
            let response = axios({
                method: "post",
                data: formData,
                url: config.baseurl + 'api/event-gallery-images' + '/gallery_images_add',
                headers: { "Content-Type": "multipart/form-data" }
            }).then((res) => {
                console.log(res.data)
                setGalleryImgRefresh((parseInt(galleryImgRefresh) + 1))
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                handleCloseEventGalleryImagesAddMdle()
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Event Logo Images

    const [eventLogoImagesAddMdle, setEventLogoImagesAddMdle] = useState(false)
    const handleCloseLogoImagesAddMdle = () => setEventLogoImagesAddMdle(false)
    const handleShowLogoImagesAddMdle = () => setEventLogoImagesAddMdle(true)

    const LogoImageAdd = (data) => {
        if (data != "") {
            console.log(data)
            handleShowLogoImagesAddMdle()
            setGalleryImageId(data)
        }
    }

    const LogoImageEdit = (data) => {
        if (data != "") {
            console.log(data)
            handleShowLogoImagesAddMdle()
            setGalleryImageId(data)
        }
    }

    const LogoImageDelete = (data) => {
        if (data != "") {
            console.log(data)
        }
    }

    const submtLogoImagesAdd = () => {
        console.log(mainEventId)
        const formData = new FormData();
        for (var i = 0; i < eventGalleryImagesFile.length; i++) {
            console.log(eventGalleryImagesFile[i]);
            formData.append("event_logo", eventGalleryImagesFile[i])
        }

        formData.append("event_id", mainEventId)

        try {
            let response = axios({
                method: "post",
                data: formData,
                url: config.baseurl + 'api/event-logo',
                headers: { "Content-Type": "multipart/form-data" }
            }).then((res) => {
                console.log(res.data)
                setEventLogoImagesRefresh((parseInt(eventLogoImagesRefresh) + 1))
                handleCloseLogoImagesAddMdle()
            }).catch((err) => {
                console.log(err)
                handleCloseLogoImagesAddMdle()
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Logo Images Update

    const submtLogoImagesUpdate = () => {
        //console.log(mainEventId)
        const formData = new FormData();
        for (var i = 0; i < eventGalleryImagesFile.length; i++) {
            console.log(eventGalleryImagesFile[i]);
            formData.append("event_logo", eventGalleryImagesFile[i])
        }
        formData.append("event_id", mainEventId)
        try {
            let response = axios({
                method: "post",
                data: formData,
                url: config.baseurl + 'api/event-logo',
                headers: { "Content-Type": "multipart/form-data" }
            }).then((res) => {
                console.log(res.data)
                setEventLogoImagesRefresh((parseInt(eventLogoImagesRefresh) + 1))
                handleCloseLogoImagesAddMdle()
            }).catch((err) => {
                console.log(err)
                handleCloseLogoImagesAddMdle()
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        axios.get(config.baseurl + 'api/organizer/event/' + mainEventId).then((res) => {
            // setEventData(res.data)
            // console.log('expo_details' ,res.data.data)
            // setEventDatesFrom(res.data.data.expo_from_date)
            // setEventDatesTo(res.data.data.expo_to_date)
            // setEventName(res.data.data.expo_name)
            // setLocation(res.data.data.venue)
            // setAdditionalInformation(res.data.data.description)
            setTotalStalls(res.data.data.available_stalls)
            setStallSqPrice(res.data.data.stall_sq_ft_price)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    useEffect(() => {
        console.log('im the stall ',stallSqftPrice )
    },[stallSqftPrice])

    const handleChangeSinglePost = (value, id) => {

          let stall_sq_fr_pricee = localStorage.getItem('stall_sq_fr_price')
            var widthVal = document.querySelector("input[name='width-" + id + "']");
            var heightVal = document.querySelector("input[name='height-" + id + "']");
            var priceVal = document.querySelector("input[name='price-" + id + "']");
            let stallPrice = stallSqftPrice
            console.log('stallSqFtPrice', stallSqftPrice)
            console.log('widthVal', widthVal.value)
            console.log('heightVal', heightVal.value)
            priceVal.value = ((widthVal.value * heightVal.value) * stall_sq_fr_pricee)
        

    }

    const [updateComplimentary, setUpdateComplimentary] = useState(false)
    const handleCloseComplimentary = () => setUpdateComplimentary(false)

    //
    const [updateComplimentaryModal, setUpdateComplimentaryModal] = useState(false);

    const handleOpenUpdateComplimentaryModal = () => setUpdateComplimentaryModal(true);
    const handleCloseUpdateComplimentaryModal = () => setUpdateComplimentaryModal(false);

    // complimentary 

    const [complimentaryName, setComplimentaryName] = useState('')

    // complimentary update

    const handleSubmitComplimentary = () => {
        // axios.post(config.baseurl + 'api/organizer/complimentary', {
        //     complimentary_name: setComplimentaryName,
        //     event_id: mainEventId,
        //     free_qty: "",
        //     extra_amount_fr_eac_qty: ""
        // }).then((res) => {
        //     console.log(res.data)
        // }).catch((err) => {
        //     console.log(err)
        // })
    }

    //

    const [stallCreationFormArr, setStallCreationFormArr] = useState([])
    const [unAssginedComplimentryCount, setUnAssignedComplimentaryCount] = useState([])

    const updateComplimentaryFun = () => {

        if(complimentaryData != "" && complimentaryData != undefined){


        setAddMoreComplementaryData([])

        if (complimentaryData.length > 0) {

            let setStallCreationArr = []

            for (let i = 0; i < complimentaryData.length; i++) {
                setStallCreationArr.push(<div class="d-flex mt-3">
                    <input class="form-control mb-2 mx-2" placeholder="stall no" name={"stallno-" + i} value={i + 1} disabled></input>
                    <input class="form-control mb-2 mx-2" type='hidden' placeholder="complimentary name id" name={"cmpnameid-" + i} value={complimentaryData[i]?.complimentary_id?._id} disabled></input>
                    <input class="form-control mb-2 mx-2" type='hidden' placeholder="complimentary data id" name={"cmpdataid-" + i} value={complimentaryData[i]?._id} disabled></input>
                    <input id={i} class="form-control mb-2 mx-2" placeholder="complimentary name" name={"cmpname-" + i} defaultValue={complimentaryData[i]?.complimentary_id?.complimentary_name} disabled></input>
                    <input id={i} class="form-control mb-2 mx-2" placeholder="Free qty" name={"freeqty-" + i} defaultValue={complimentaryData[i]?.free_qty}></input>
                    <input id={i} class="form-control mb-2 mx-2" placeholder="Price" name={"price-" + i} defaultValue={complimentaryData[i]?.extra_amount_fr_eac_qty}></input>

                    <div class="form-check form-switch mx-2" style={{display: 'none'}}>
                        <input id={i} class="form-check-input" type="checkbox" name={"compactivein-" + i} defaultChecked={true} />
                        <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                    </div>
                </div>)
            }

            setStallCreationFormArr(setStallCreationArr)

        }else {
            axios.get(config.baseurl + 'api/organizer/complimentary-data').then((res) => {

                let setStallCreationArr = []

                setUnAssignedComplimentaryCount(res.data.data.length)

                for (let i = 0; i < res.data.data.length; i++) {
                    setStallCreationArr.push(
                        <div>
                            <div class="d-flex mt-3">
                                <input class="form-control mb-2 mx-2" placeholder="stall no" name={"stallno-" + i} value={i + 1} disabled></input>
                                <input class="form-control mb-2 mx-2" type='hidden' placeholder="complimentary name id" name={"unacmpnameid-" + i} value={res.data.data[i]._id} disabled></input>
                                <input class="form-control mb-2 mx-2" type='hidden' placeholder="complimentary data id" name={"unacmpdataid-" + i} value={res.data.data[i]._id} disabled></input>
                                <input id={i} class="form-control mb-2 mx-2" placeholder="complimentary name" name={"unacmpname-" + i} defaultValue={res.data.data[i].complimentary_id.complimentary_name} disabled></input>
                                <input id={i} class="form-control mb-2 mx-2" placeholder="Free qty" name={"unafreeqty-" + i}></input>
                                <input id={i} class="form-control mb-2 mx-2" placeholder="Price" name={"unaprice-" + i}></input>

                                <div class="form-check form-switch mx-2">
                                    <input id={i} class="form-check-input" type="checkbox" name={"unacompactivein-" + i} defaultChecked={false} />
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                </div>
                            </div>
                        </div>)
                }

                setStallCreationFormArr(setStallCreationArr)

            }).catch((err) => {
                console.log(err)
            })
        }

        handleOpenUpdateComplimentaryModal()
    }
    }



    // Add More Complementary Functions

    const [addMoreComplementaryData, setAddMoreComplementaryData] = useState('')
    const [addMoreComplementaryCount, setAddMoreComplementaryCount] = useState(0)

    const addMoreComplementary = () => {

       
        setAddMoreComplementaryData([
            ...addMoreComplementaryData,
            <div class="d-flex mt-3">
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"extrstallno-" + addMoreComplementaryCount} placeholder="Stall no"></input>
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"extrcmpname-" + addMoreComplementaryCount} placeholder="Complimentry Name"></input>
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"extrfreeqty-" + addMoreComplementaryCount} placeholder="Free qty"></input>
                <input id={addMoreComplementaryCount} class="form-control mb-2 mx-2" name={"extrprice-" + addMoreComplementaryCount} placeholder="Price"></input>

                <div class="form-check form-switch mx-2" style={{display: 'none'}}>
                    <input class="form-check-input" type="checkbox" role="switch" name={"extrcompactivein-" + addMoreComplementaryCount} id={addMoreComplementaryCount} defaultChecked={true} />
                    <label class="form-check-label" for={addMoreComplementaryCount}>Active</label>
                </div>
            </div>
        ])
        setAddMoreComplementaryCount(addMoreComplementaryCount + 1)
       
    }

    // submit create complimentary

    const [complementData, setComplementData] = useState([])
    const [complementExtraData, setComplementExtraData] = useState([])
    const [complementUnAssignData, setComplementUnAssignData] = useState([])

    const submitCreateCompliementry = () => {

        var complementArr = []

        for (let i = 0; i < complimentaryData.length; i++) {
            var complimentaryNameId = document.querySelector("input[name='cmpnameid-" + i + "']")
            var complimentaryDataId = document.querySelector("input[name='cmpdataid-" + i + "']")

            var complementryName = document.querySelector("input[name='cmpname-" + i + "']")
            var freeQty = document.querySelector("input[name='freeqty-" + i + "']")
            var price = document.querySelector("input[name='price-" + i + "']")
            var compActiveInactive = document.querySelector("input[name='compactivein-" + i + "']")

            var compActiveInactiveStatus

            if (compActiveInactive.checked == true) {
                var compActiveInactiveStatus = '1'
            } else {
                var compActiveInactiveStatus = '0'
            }

            // console.log(complementryName.value, freeQty.value, price.value, compActiveInactiveStatus, complimentaryNameId.value, complimentaryDataId.value)

            if (complementryName.value != "" & freeQty.value != "" & price.value != "") {
                complementArr.push({
                    "complment_name_id": complimentaryNameId.value,
                    "complemnt_data_id": complimentaryDataId.value,
                    "complement_id": complimentaryData[i].complimentary_id._id,
                    "complementry_name": complementryName.value,
                    "free_qty": freeQty.value,
                    "extra_amount_fr_eac_qty": price.value,
                    "status": compActiveInactiveStatus
                })
            }

        }

        var complementExtraArr = []

        const extraComplementaryFunction = () => {

            if (addMoreComplementaryCount > 0) {

                console.log("addMoreComplementaryCount" + addMoreComplementaryCount)

                for (let i = 0; i < addMoreComplementaryCount; i++) {
                    //var stallNo = document.querySelector("input[name='stallno-" + complimentaryData[i]._id + "']")
                    var complementryName = document.querySelector("input[name='extrcmpname-" + i + "']")
                    var freeQty = document.querySelector("input[name='extrfreeqty-" + i + "']")
                    var price = document.querySelector("input[name='extrprice-" + i + "']")
                    var compActiveInactive = document.querySelector("input[name='extrcompactivein-" + i + "']")

                    console.log('the check button ', compActiveInactive)

                    var compActiveInactiveStatus
                    if (compActiveInactive.checked == true) {
                        var compActiveInactiveStatus = '1'
                    } else {
                        var compActiveInactiveStatus = '0'
                    }

                    console.log('the queen data ', compActiveInactiveStatus)

                    if (compActiveInactiveStatus != '0') {
                        if (complementryName.value != "" & freeQty.value != "" & price.value != "") {
                            complementExtraArr.push({
                                "complementry_name": complementryName.value,
                                "free_qty": freeQty.value,
                                "extra_amount_fr_eac_qty": price.value,
                                "status": compActiveInactiveStatus
                            })
                        }
                    }
                }
            }
        }

        // un assigned complements

        var complementUnAssignArr = []

        const unAssignedComplements = () => {


            for (let i = 0; i < unAssginedComplimentryCount; i++) {
                var complimentaryNameId = document.querySelector("input[name='unacmpnameid-" + i + "']")
                var complimentaryDataId = document.querySelector("input[name='unacmpdataid-" + i + "']")
                var complementryName = document.querySelector("input[name='unacmpname-" + i + "']")
                var freeQty = document.querySelector("input[name='unafreeqty-" + i + "']")
                var price = document.querySelector("input[name='unaprice-" + i + "']")
                var compActiveInactive = document.querySelector("input[name='unacompactivein-" + i + "']")

                var compActiveInactiveStatus

                if (compActiveInactive?.checked == true) {
                    var compActiveInactiveStatus = '1'
                } else {
                    var compActiveInactiveStatus = '0'
                }

                if(complimentaryNameId?.value != "" & freeQty?.value != "" & price?.value != "") {
                    complementUnAssignArr.push({
                        "complment_name_id": complimentaryNameId?.value,
                        "free_qty": freeQty?.value,
                        "price": price?.value,
                        "status": compActiveInactiveStatus
                    })
                }

            }
        }

        unAssignedComplements()
        extraComplementaryFunction()
        setComplementExtraData(complementExtraArr)
        setComplementData(complementArr)
        setComplementUnAssignData(complementUnAssignArr)       
    }

    useEffect(() => {

        console.log('complimentary extra function update triggered')

        let makeArr = []
        console.log('the whole point of the data', makeArr)
        makeArr.push({
            "event_id": mainEventId,
            "complement_data": complementData,
            "complement_extra_data": complementExtraData
        })
        console.log('whole data', makeArr)

        axios.put(config.baseurl + 'api/organizer/complimentary-data/cmp_update', {
            "event_id": mainEventId,
            "complement_data": complementData,
            "complement_extra_data": complementExtraData
        }).then((res) => {
            console.log(res.data)
            setAddMoreComplementaryCount(0)
            setComplimentaryDataRefreshRefre(complimentaryDataRefreshRefre + 1)
            handleCloseUpdateComplimentaryModal()
        }).catch((err) => {
            console.log(err)
            setAddMoreComplementaryCount(0)
            setComplimentaryDataRefreshRefre(complimentaryDataRefreshRefre + 1)
            handleCloseUpdateComplimentaryModal()
        })
    }, [complementExtraData])


    return (
        <>
            <>

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

                        {/* Main */}
                        <div class="row">
                            <div class="col-12">
                                <div class="card mb-4" style={{ postition: 'relative' }}>
                                    <div class="card-header pb-3">
                                        <h5 style={{ textTransform: 'uppercase' }}>Edit Event</h5>
                                    </div>
                                    <div class="card-body pb-5 px-5 ">
                                        <div class="row mt-3">
                                            <div class="col-xl-12">

                                                <Tab.Container id="left-tabs-example" defaultActiveKey="second">
                                                    <Row>
                                                        <Nav variant="pills">
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="second">
                                                                    <Button variant="primary">Event Details</Button>
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="sixth">
                                                                    <Button variant="primary">Complementary</Button>
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                            <Nav.Item>
                                                                <Nav.Link eventKey="third">
                                                                    <Button variant="primary">Stalls</Button>
                                                                </Nav.Link>
                                                            </Nav.Item>

                                                            <Nav.Item>
                                                                <Nav.Link eventKey="fourth">
                                                                    <Button variant="primary">Gallery Images</Button>
                                                                </Nav.Link>
                                                            </Nav.Item>

                                                            <Nav.Item>
                                                                <Nav.Link eventKey="fifth">
                                                                    <Button variant="primary">Event Logo</Button>
                                                                </Nav.Link>
                                                            </Nav.Item>
                                                        </Nav>
                                                        <Tab.Content>
                                                            <Tab.Pane eventKey="second">
                                                                <div class="row mt-3">
                                                                    <div class="col-xl-12">
                                                                        <Button class="btn btn-primary float-right" onClick={handleUpdateEventModlShow}>Edit event</Button>
                                                                    </div>
                                                                </div>
                                                                <div class="row mt-3">
                                                                    <div class="col-xl-12">

                                                                        <Table striped bordered hover>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>Particulars</th>
                                                                                    <th>Details</th>
                                                                                    {/* <th>Event Name</th> */}
                                                                                    {/* <th>Event Starts From</th>
                                                                                    <th>Event Starts Till</th>
                                                                                    <th>Location</th>
                                                                                    <th>Details</th> */}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td>Event Name</td>
                                                                                    <td>{eventName}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Location</td>
                                                                                    <td>{location}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Event Start Date</td>
                                                                                    <td>{eventDatesFrom}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Event End Date</td>
                                                                                    <td>{eventDatesTo}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Description</td>
                                                                                    <td>{additionalInformation}</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>Available Stalls</td>
                                                                                    <td>{totalStalls}</td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </Table>
                                                                    </div>
                                                                </div>

                                                            </Tab.Pane>
                                                            <Tab.Pane eventKey="third">
                                                                <div class="row mt-3">
                                                                    <div class="col-xl-12">
                                                                        <Button class="btn btn-primary float-right" onClick={handleUpdateStallsBtn}>Update Stalls</Button>
                                                                    </div>
                                                                </div>
        
                                                                <div class="stall-grid">

                                                                    {/* {
                                                                        stallsData.map((data, i) => {
                                                                            return (

                                                                                <div class="stall-layout-box">
                                                                                    <p class="mb-0">{data.width + '*' + data.height}</p>
                                                                                    <div>
                                                                                        <p class="mb-0 stall-count">{i}</p>
                                                                                    </div>
                                                                                </div>

                                                                            )
                                                                        })
                                                                    } */}

                                                                    {
                                                                        stallsData != "" ?
                                                                            stallsData : null
                                                                    }
                                                                </div>


                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="fourth">
                                                                <div class="row mt-3">
                                                                    <div class="col-xl-12">
                                                                        <button class="btn btn-primary" style={{ float: 'right' }} onClick={handleShowEventGalleryImagesAddmdle}>Add Gallery Images</button>
                                                                    </div>
                                                                </div>
                                                                <div class="gallery-images-grid">
                                                                    <div class="row">
                                                                        <div class="col-xl-12">
                                                                            {
                                                                                galleryImagesData.map((data, i) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div class="gallery-images-layout-box">
                                                                                                <img class="event-gallery-img" src={config.baseurl + data.event_gallery_images_path}></img>
                                                                                                <button class="btn btn-primary mx-2" id={data._id} onClick={() => galleryImageEdit(data?._id)}><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i></button>
                                                                                                <button class="btn btn-primary" id={data._id} onClick={() => galleryImageDelete(data?._id)}><i class="far fa-trash-alt text-dark me-2" aria-hidden="true"></i></button>
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="fifth">
                                                                <div class="row mt-3">
                                                                    <div class="col-xl-12">
                                                                        <button class="btn btn-primary mx-2 float-right" id={data._id} onClick={() => LogoImageAdd(data?._id)}>Add Logo Images</button>
                                                                    </div>
                                                                </div>
                                                                <div class="gallery-images-grid">
                                                                    {
                                                                        eventLogoImages.map((data) => {
                                                                            return (
                                                                                <>
                                                                                    <div class="gallery-images-layout-box">
                                                                                        <img class="event-gallery-img" src={config.baseurl + data.event_logo_image_path}></img>
                                                                                        <button class="btn btn-primary mx-2" id={data._id} onClick={() => LogoImageEdit(data?._id)}><i class="fas fa-pencil-alt text-dark me-2" aria-hidden="true"></i></button>
                                                                                        <button class="btn btn-primary" id={data._id} onClick={() => LogoImageDelete(data?._id)}><i class="far fa-trash-alt text-dark me-2" aria-hidden="true"></i></button>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </Tab.Pane>

                                                            <Tab.Pane eventKey="sixth">
                                                                <div class="row">
                                                                    <div class="col-xl-12 mt-3">
                                                                        <button class="btn btn-primary mx-2" onClick={updateComplimentaryFun}>Update Complimentary</button>
                                                                    </div>
                                                                </div>
                                                                <div class="row">
                                                                    <div class="col-xl-12 mt-3">
                                                                        <Table striped bordered hover>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>#</th>
                                                                                    <th>Compliementary</th>
                                                                                    <th>Free Qty</th>
                                                                                    <th>Price</th>
                                                                                    {/* <th>Extra Qty</th> */}
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {

                                                                                    complimentaryData.map((data, i) => {

                                                                                        return (
                                                                                            <>
                                                                                                <tr>
                                                                                                    <td>{i + 1}</td>
                                                                                                    <td>{data?.complimentary_id?.complimentary_name}</td>
                                                                                                    <td>{data?.free_qty}</td>
                                                                                                    <td>{data?.extra_amount_fr_eac_qty}</td>
                                                                                                    {/* <td>{data.extry_qty}</td> */}
                                                                                                </tr>

                                                                                            </>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </tbody>
                                                                        </Table>
                                                                    </div>
                                                                </div>
                                                            </Tab.Pane>
                                                        </Tab.Content>
                                                    </Row>
                                                </Tab.Container>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Basic Details Edit */}

                        <Modal show={updateEventModl} onHide={handleUpdateEventModlClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Event</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div class="row pt-3 pb-0">
                                    <div class="col-xl-6">
                                        <div class="mb-3">
                                            <label for="event_name" class="form-label">Event Name</label>
                                            <input type="text" class="form-control" id="event_name" placeholder="eg. Event Name" defaultValue={eventName} onChange={(e) => setEventName(e.target.value)} />
                                        </div>
                                        {/* <div class="mb-3">
                                            <label for="event_start_date" class="form-label">Event Dates (Starts From)</label>
                                            <DatePicker class="data-picker-style" selected={eventStartDatPikr} onChange={(date) => setEventStartDatPikr(new Date(date))} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="event_end_date" class="form-label">Event Dates (End)</label>
                                            <DatePicker class="data-picker-style" selected={eventEndDatPikr} onChange={(date) => setEventEndDatPikr(new Date(date))} />
                                        </div> */}
                                        <div class="mb-3">
                                            <label for="location" class="form-label">Location</label>
                                            <input type="text" class="form-control" id="location" placeholder="Location" defaultValue={location} onChange={(e) => setLocation(e.target.value)} />
                                        </div>
                                        {/* <div class="mb-3">
                                            <label for="location" class="form-label">Event Type</label>
                                            {
                                                eventTypeList != "" ?
                                                    <Form.Select aria-label="Default select example" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                                                        <option>select</option>
                                                        {
                                                            eventTypeList.map((data, i) => {
                                                                return (
                                                                    <option value={data._id}>{data.event_type}</option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Select>
                                                    : null
                                            }
                                        </div> */}
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="mb-3">
                                            <label for="additional_info" class="form-label">Additional Information</label>
                                            <textarea type="text" class="form-control" id="additional_info" rows="5" placeholder="Additional Information" defaultValue={additionalInformation} onChange={(e) => setAdditionalInformation(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleUpdateEventModlClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={submtEventDetails}>
                                    Update
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Event Stalls Edit */}

                        {/* <Button variant="primary" onClick={handleUpdateEventStallModlShow}>Launch demo modal</Button> */}

                        <Modal show={updateEventStallModl} onHide={handleUpdateEventStallModlClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Stall Update</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>

                                <div class="stall-box">
                                    {
                                        eventStallsData ?
                                            eventStallsData : null
                                    }

                                    {
                                        extraEventStallData ?
                                            extraEventStallData : null
                                    }
                                </div>

                            </Modal.Body>
                            <Modal.Footer >
                                <div class="row">
                                    <div class="col-xl-6">
                                        <input class="form-control mb-2 mz-2" type="number" placeholder="" defaultValue={extraEventStallCount} onChange={(e) => setExtraEventStallCount(e.target.value)}></input>
                                    </div>
                                    <div class="col-xl-6">
                                        <Button class="btn btn-secondary" onClick={setExtraEventStallFunction}>Add Stalls</Button>
                                    </div>
                                </div>
                                <div>
                                    {/* <Button class="btn btn-secondary" onClick={getRandomValue}>getRandomValue</Button> */}
                                    {/* <Button class="btn btn-secondary mx-2" onClick={checkVal}>check value</Button> */}
                                    <Button class="btn btn-secondary mx-2" onClick={handleUpdateEventStallModlClose}>
                                        Close
                                    </Button>
                                    <Button class="btn btn-primary mx-2" onClick={submtStallUpdate}>
                                        Update Stalls
                                    </Button>
                                </div>
                            </Modal.Footer>
                        </Modal>

                        {/*  */}

                        <Modal show={galleryImageModal} onHide={handleCloseGalleryImagesModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Gallery Images Update</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Choose Image</p>
                                <div class="input-group mb-3">
                                    <input type="file" class="form-control" id="inputGroupFile01" onChange={handleEventGalleryImages} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseGalleryImagesModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={submitGalleryImagesReplace}>
                                    Replace
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Delete Images */}

                        <Modal show={galleryImagesDelModal} onHide={handleCloseGalleryImageDelModl}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm Delete</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Confirm Delete</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseGalleryImageDelModl}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={submitGalleryImagesDelete}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Add Gallery Images */}

                        <Modal show={eventGalleryImagesAddMdle} onHide={handleCloseEventGalleryImagesAddMdle}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Gallery Images</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Choose Image</p>
                                <div class="input-group mb-3">
                                    <input type="file" class="form-control" id="inputGroupFile01" onChange={handleEventGalleryImages} multiple />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseEventGalleryImagesAddMdle}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={submtGalleryImagesAdd}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/*  Add Logo Images */}

                        <Modal show={eventLogoImagesAddMdle} onHide={handleCloseLogoImagesAddMdle}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Logo Images</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Choose Image</p>
                                <div class="input-group mb-3">
                                    <input type="file" class="form-control" id="inputGroupFile01" onChange={handleEventGalleryImages} multiple />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseLogoImagesAddMdle}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={submtLogoImagesAdd}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>

                        {/* Edit Event Logo */}

                        <Modal show={eventLogoImagesAddMdle} onHide={handleCloseLogoImagesAddMdle}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Event Logo Images</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <p>Choose Image</p>
                                <div class="input-group mb-3">
                                    <input type="file" class="form-control" id="inputGroupFile01" onChange={handleEventGalleryImages} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseLogoImagesAddMdle}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={submtLogoImagesUpdate}>
                                    Add
                                </Button>
                            </Modal.Footer>
                        </Modal>


                        <Modal show={updateComplimentaryModal} onHide={handleCloseUpdateComplimentaryModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Update Complimentary</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div class="row">
                                    <div class="col-xl-12">


                                        {
                                            stallCreationFormArr != "" ?
                                                stallCreationFormArr : null
                                        }

                                        {
                                            addMoreComplementaryData != ""
                                                ?
                                                addMoreComplementaryData
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                                <Button variant="primary" onClick={addMoreComplementary}>Add New</Button>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseUpdateComplimentaryModal}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={submitCreateCompliementry}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </main>
                {/* Modals */}
            </>
        </>
    )
}

export default EventEdit