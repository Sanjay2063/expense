import React, { useState, useEffect } from 'react';
import Sidenav from '../components/Sidenav';
import axios from 'axios';

const Expense = () => {
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: ''
  });

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/get-expenses');
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
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
      await axios.post('http://localhost:5000/api/v1/add-expense', form);
      // alert('Expense added successfully');
      setForm({
        title: '',
        amount: '',
        category: '',
        description: '',
        date: ''
      });
   
      const response = await axios.get('http://localhost:5000/api/v1/get-expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error('Error adding expense:', error);
      alert('Failed to add expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/delete-expense/${id}`);
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center p-5' style={{ height: '100vh' }}>
      <Sidenav />
      <div className='bg-white ms-3 me-5' style={{ height: '100%', width: '85%', borderRadius: '20px' }}>
        <div className='m-3'>
          <h2>Expense</h2>
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
            <div className='form-group my-2'>
              <label>Date</label>
              <input type='date' className='form-control border border-black' name='date' value={form.date} onChange={handleChange} required />
            </div>
            <button type='submit' className='btn btn-primary my-2'>Add Expense</button>
          </form>
            </div>



            <div className='w-50 ps-5'>
            <table className='table mt-3 '>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(expense => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>{expense.amount}</td>
                  
                  <td>
                    <button onClick={() => handleDelete(expense._id)} className='btn btn-danger btn-sm'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>

          </div>
          
          
        </div>
      </div>
    </div>
  );
};

export default Expense;
