import React, { useState, useEffect } from 'react';
import Sidenav from '../components/Sidenav';
import { Bar, Pie } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [chartData, setChartData] = useState({});
  const [pieData, setPieData] = useState({});
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [numTransactions, setNumTransactions] = useState(0);
  const [avgIncome, setAvgIncome] = useState(0);
  const [avgExpense, setAvgExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get('http://localhost:5000/api/v1/get-incomes');
        const expenseResponse = await axios.get('http://localhost:5000/api/v1/get-expenses');

        const incomes = Array.isArray(incomeResponse.data) ? incomeResponse.data : [];
        const expenses = Array.isArray(expenseResponse.data) ? expenseResponse.data : [];

        const incomeData = incomes.map(income => ({
          date: income.date,
          amount: income.amount,
        }));

        const expenseData = expenses.map(expense => ({
          date: expense.date,
          amount: expense.amount,
        }));

        const dates = [...new Set([...incomeData.map(i => i.date), ...expenseData.map(e => e.date)])];

        const chartData = {
          labels: dates,
          datasets: [
            {
              label: 'Income',
              data: dates.map(date => {
                const incomeForDate = incomeData.find(i => i.date === date);
                return incomeForDate ? incomeForDate.amount : 0;
              }),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: 'Expense',
              data: dates.map(date => {
                const expenseForDate = expenseData.find(e => e.date === date);
                return expenseForDate ? expenseForDate.amount : 0;
              }),
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
          ],
        };

        setChartData(chartData);

        const totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
        const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        const totalBalance = totalIncome - totalExpense;

        setTotalIncome(totalIncome);
        setTotalExpense(totalExpense);
        setTotalBalance(totalBalance);

        const numTransactions = incomes.length + expenses.length;
        setNumTransactions(numTransactions);

        const avgIncome = incomes.length ? totalIncome / incomes.length : 0;
        setAvgIncome(avgIncome);

        const avgExpense = expenses.length ? totalExpense / expenses.length : 0;
        setAvgExpense(avgExpense);

        const pieData = {
          labels: ['Income', 'Expense'],
          datasets: [
            {
              data: [totalIncome, totalExpense],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
          ],
        };

        setPieData(pieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='d-flex justify-content-center align-items-center p-5' style={{ height: '100vh' }}>
      <Sidenav />
      <div className='bg-white ms-3 me-5' style={{ height: '100%', width: '85%', borderRadius: '20px'}}>
        <div className='' style={{height:'100%'}}>
        <div className='m-4'>
        <h2>Dashboard</h2>
        </div>
        <div>
        <div className='d-flex justify-content-around'>
            <div className='card' style={{borderRadius: '20px'}}>
              <div className='card-body'>
                <h5 className='card-title'>Total Income</h5>
                <p className='card-text'>{totalIncome}</p>
              </div>
            </div>
            <div className='card' style={{borderRadius: '20px'}}>
              <div className='card-body'>
                <h5 className='card-title'>Total Expense</h5>
                <p className='card-text'>{totalExpense}</p>
              </div>
            </div>
            <div className='card' style={{borderRadius: '20px'}}>
              <div className='card-body'>
                <h5 className='card-title'>Total Balance</h5>
                <p className='card-text'>{totalBalance}</p>
              </div>
            </div>
            <div className='card' style={{borderRadius: '20px'}}>
              <div className='card-body'>
                <h5 className='card-title'>Number of Transactions</h5>
                <p className='card-text'>{numTransactions}</p>
              </div>
            </div>
            <div className='card' style={{borderRadius: '20px'}}>
              <div className='card-body'>
                <h5 className='card-title'>Average Income</h5>
                <p className='card-text'>{avgIncome.toFixed(2)}</p>
              </div>
            </div>
            <div className='card' style={{borderRadius: '20px'}}>
              <div className='card-body'>
                <h5 className='card-title'>Average Expense</h5>
                <p className='card-text'>{avgExpense.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div>
          <div className='mx-3 my-4' style={{height: '400px',marginTop:'70px'}}>
            {chartData && chartData.labels && chartData.labels.length > 0 && (
              <Bar data={chartData} options={{
                responsive: true,
                maintainAspectRatio: false,
              }} />
            )}
          </div>
          {/* <div className='mx-3 my-4'>
            {pieData && pieData.labels && pieData.labels.length > 0 && (
              <Pie data={pieData} options={{
                responsive: true,
                maintainAspectRatio: false,
              }} />
            )}
          </div> */}
        </div>
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default Dashboard;

