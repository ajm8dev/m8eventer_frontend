import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Event from "../pages/event/Event";
import Master from "../pages/master/Master";
import MasterStall from "../pages/master/stall_master"
import EventEdit from '../pages/event/EventEdit'
import Exhibitors from '../pages/exhibitors/exhibitors';
import Customers from '../pages/customer/Customer'
import VisitorRegistration from '../pages/visitors/visitors'
import VisitorQr from '../pages/visitors/visitor_qr'
import UserRegistration from '../pages/registration/Registration'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Usermanagement from '../pages/users/Usermanagement'
import EventType from '../pages/master/EventType'
import Dashboard from '../pages/dashboard/index'

const routeList = () => {
    return (
        <>
            <Routes>
                <Route path="/">
                    <Route index element={<Login />} />
                    <Route path="home" element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="event" element={<Event />} />
                    <Route path="master" element={<Master />} />
                    <Route path="stall-master" element={<MasterStall />} />
                    <Route path="event/event-edit/:mainEventId" element={<EventEdit />} />
                    <Route path="event/event-type" element={<EventType />} />
                    <Route path="exhibitors" element={<Exhibitors />} />
                    <Route path="customers" element={<Customers/>} />
                    <Route path="visitor-registration/:organization_id/:event_id_params" element={<VisitorRegistration/>}/>
                    <Route path="super-admin/user-registration" element={<UserRegistration/>}/>
                    <Route path="visitor-registration/qr/:id/:name/:organization/:event_name/:event_fr_date/:event_to_date/:event_location/:event_time" element={<VisitorQr/>}/>
                    <Route path="super-admin/user-management/:organization_id/:event_id" element={<Usermanagement/>} />
                </Route>
            </Routes>
        </>
    )
}

export default routeList