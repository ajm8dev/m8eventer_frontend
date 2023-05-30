import { useRef, useState, useEffect } from "react";
import "./login.scss";
import { Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import config from '../../config.json'

const Login =() => {   

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    
    const handleLogin = () => {
      axios.post(config.baseurl+'api/user/login', {
        email: email,
        password: password
      }).then((res) => {

        let token = res.data.token
        axios.get(config.baseurl+'api/user/validate_auth', {
          headers: {
            Authorization: 'Bearer '+token
          }
        }).then((res) => {
          if(res.data.data.type == 'organizer' & res.data.data.role == 'ADMIN'){

            console.log('res.data.data ', res.data.data)

            
            localStorage.setItem('token', token);
            localStorage.setItem('role', res.data.data.role)
            localStorage.setItem('organization_id', res.data.data.organizations.organization_id)
            localStorage.setItem('user_id', res.data.data._id)
            navigate('/event')
          }else if(res.data.data.role == 'STAFF'){

             

              localStorage.setItem('token', token);
              localStorage.setItem('role', res.data.data.role)
              localStorage.setItem('organization_id', res.data.data.organizations.organization_id)
              localStorage.setItem('user_id', res.data.data._id)
              let orgId = res.data.data.organizations.organization_id
            axios.get(config.baseurl+'api/users/get_event_assign/'+res.data.data._id).then((res) => {
               console.log('event for registor', res.data.data[0].event_id)
               localStorage.setItem('staff_def_route', '/visitor-registration'+'/'+orgId+'/'+res.data.data[0].event_id)
               navigate('/visitor-registration'+'/'+orgId+'/'+res.data.data[0].event_id)
            }).catch((err) => {
              console.log('event for registor err' , err)
            })
          }else{
            alert('you are not auth to this site')
            navigate('/visitor-registration')          
          }
          
          
        }).catch((err) => {
          alert(err)
        })

      }).catch((err) => {
        alert('something went wrong, email or password is wrong')
      })
    }

    const auth = localStorage.getItem('token');

    useEffect(() => { 
      axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
      if(auth == null){
        navigate('/');
      }else{
        navigate('/event')
      }
    }, [])

    return(
        <>
        <main class="main-content  mt-0">
        <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-5 col-md-4 d-flex flex-column mx-lg-0 mx-auto">
              <div class="card card-plain">
                <div class="card-header pb-0 text-start text-center">
                  {/* <img src="../assets/img/jewelar.png" class="navbar-brand-img h-500 mb-3" alt="main_logo" width="25%" /><br /> */}
                  <span class="ms-1 font-weight-bold logintxtcl " >M8 EVENTER</span>
                </div>
                <div class="card-body">
                  <form role="form" >
                    <div class="mb-3">
                      <input type="email" class="form-control form-control-lg" placeholder="Email" aria-label="Email" value={email}
                      onChange={(e) => { setEmail(e.target.value); }} />
                    </div>
                    <div class="mb-3">
                      <input type="password" class="form-control form-control-lg" placeholder="Password" aria-label="Password" value={password}
                      onChange={(e) => { setPassword(e.target.value); }} />
                    </div>
                    
                    <div class="text-center">
                      <button type="button" onClick={handleLogin} class="btn btn-lg btn-primary btn-lg w-100 mt-4 mb-0">Sign in</button>
                    </div>
                  </form>
                </div>
                <div class="card-footer text-center pt-0 px-lg-2 px-1">
                  <p class="mb-4 text-sm mx-auto">
                   
                  </p>
                </div>
              </div>
            </div>
            <div class="col-7 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 end-0 text-center justify-content-center flex-column">
              <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden loginbgscreen" >
                <span class="mask bg-primary opacity-6"></span>
                
              </div>
            </div>
          </div>
          </div>
          </div>



        
        </main>
         
      
        </>
    )
}

export default Login;