import React from 'react'
import { RxDashboard } from "react-icons/rx";
import { SlLogout } from "react-icons/sl";
import { FaWallet } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import avatar from '../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
const Sidenav = () => {
    const navigate = useNavigate();
  return (
    
      <div className='bg-white ms-2 me-5' style={{ height: '100%', width: '300px', borderRadius: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        
        <div className="user-con d-flex justify-content-center mt-5">
          <div style={{ borderRadius: '50%',border:'solid' }} className=''>
            <img src={avatar} alt="Avatar" style={{ height: '47px', width: '47px' }} />
          </div>
          <div className="text ms-3 mt-2">
            <h2>Sanjay</h2>
            {/* <p>Your Money</p> */}
          </div>
        </div>
        
        <div className='menu-container d-flex flex-column align-items-center mt-5' style={{ flexGrow: 1 }}>
          <ul className="menu-items" style={{ listStyle: "none",cursor: 'pointer', padding: 0 }}>
            <li className='active' style={{ fontSize: '1.2em', marginBottom: '15px' }} onClick={()=>{navigate('/dashboard')}}>
              <RxDashboard />
              <span className='ms-2'>Dashboard</span>
            </li>
            <li className='active' style={{ fontSize: '1.2em', marginBottom: '15px' }} onClick={()=>{navigate('/Expense')}}>
            <FaMoneyBillTrendUp />
              <span className='ms-2'>Expense</span>
            </li>
            <li className='active' style={{ fontSize: '1.2em', marginBottom: '15px' }} onClick={()=>{navigate('/Income')}}>
            <FaWallet />
              <span className='ms-2'>Income</span>
            </li>
          </ul>
        </div>

        <div className="bottom-nav mb-4">
          <li className='text-center' style={{ listStyle: "none", cursor: 'pointer', fontSize: '1.2em' }} onClick={()=>{navigate('/')}}> 
          <SlLogout />
          <span className='ms-2'>Logout</span>
            
          </li>
        </div>
        
      </div>
    
  )
}

export default Sidenav
