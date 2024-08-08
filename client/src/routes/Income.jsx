import React, { useState, useEffect } from 'react';
import Sidenav from '../components/Sidenav';
import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const Income = () => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/get-incomes');
        setIncomes(response.data);
      } catch (error) {
        console.error('Error fetching incomes:', error);
      }
    };

    fetchIncomes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/v1/add-income', form);
      // toast.success('Deleted Successfully!', {
      //   position: "bottom-left",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      
      //   });
      setForm({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: ''
      });
      
      const response = await axios.get('http://localhost:5000/api/v1/get-incomes');
      setIncomes(response.data);
    } catch (error) {
      console.error('Error adding income:', error);
      alert('Failed to add income');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete-income/${id}`);
      setIncomes(incomes.filter(income => income._id !== id));
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center p-5' style={{ height: '100vh' }}>
      <Sidenav />
      <div className='bg-white ms-3 me-5' style={{ height: '100%', width: '85%', borderRadius: '20px' }}>
        <div className='m-3'>
          <h2>Income</h2>
          <div className='d-flex justify-content-evenly'>
            <div className='w-50'>
            <form onSubmit={handleSubmit}>
            <div className='form-group my-2'>
              <label>Title</label>
              <input type='text' className='form-control border border-black' name='title' value={form.title} onChange={handleChange} required />
            </div>
            <div className='form-group my-2'>
              <label>Amount</label>
              <input type='number' className='form-control border border-black' name='amount' value={form.amount} onChange={handleChange} required />
            </div>
            <div className='form-group my-2'>
              <label>Category</label>
              <input type='text' className='form-control border border-black' name='category' value={form.category} onChange={handleChange} required />
            </div>
            <div className='form-group my-2'>
              <label>Description</label>
              <input type='text' className='form-control border border-black' name='description' value={form.description} onChange={handleChange} required />
            </div>
            <div className='form-groupmy-2'>
              <label>Date</label>
              <input type='date' className='form-control border border-black' name='date' value={form.date} onChange={handleChange} required />
            </div>
            <button type='submit' className='btn btn-primary my-3'>Add Income</button>
          </form>
            </div>
            <div className='w-50 ms-5'>
            <table className="table table-striped"><table className='table mt-3'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map(income => (
                <tr key={income._id}>
                  <td>{income.title}</td>
                  <td>{income.amount}</td>
                  
                  <td>
                    <button onClick={() => handleDelete(income._id)} className='btn btn-danger btn-sm'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table></table>
          </div>
          </div>
         
          
          
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Income;
