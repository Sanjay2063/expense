import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [user,setUser] = useState("")
    const [pwd,setPwd] = useState("")
    const handleUser=(event)=>{
        setUser(event.target.value)
        
    }
    const handlePwd=(event)=>{
        setPwd(event.target.value)
        
    }
    const check=(event)=>{
        event.preventDefault();
        if(user==='Sanjay' && pwd==='aaaa'){
            setPwd('')
            setUser('')
            
            document.getElementById('error-message').innerHTML=""
            localStorage.setItem("name",user)
            sessionStorage.setItem('auth','true')
            navigate('/dashboard')
        }
        else{
            document.getElementById('error-message').innerHTML="Login Failed"
            setPwd('')
            setUser('')
        }
        
        
    }
    useEffect(()=>{
        setPwd('')
        setUser('')
    },[])
  return (
    
    <div className="row justify-content-center align-items-center bg-dark m-0"  style={{height:'100vh',width:'100vw'}}>
        <div className="border border-dark p-3 d-flex justify-content-center align-items-center">
        <div className="card">
            <div className="card-body">
                <h5 className="card-title text-center">Login</h5>
                <form id="loginForm">
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control border-primary" id="username" name="username" onChange={handleUser} required value={user}></input>
                    </div>
                    <div class="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" className="form-control border-primary" id="password" name="password" onChange={handlePwd} required value={pwd}></input>
                    </div>
                    <button type="submit" className="btn btn-primary w-100" onClick={check}>Login</button>
                    <p id="error-message" className="error-message mt-3 text-center"></p>
                </form>
            </div>
        </div>
            
        </div>
        

    </div>
  )
}

export default Login