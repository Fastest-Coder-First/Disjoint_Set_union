import React,{useState,useEffect} from 'react'
import "./App.css"
import axios from "axios"

import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);


const App = () => {
  const [status,setStatus]=useState("income")
  const [categoryinc,setCategoryInc]=useState("")
  const [name,setName]=useState("");
  const [amount,setAmount]=useState("")
  const [incomes,setIncomes]=useState([])
  const [expenses,setExpenses]=useState([])
const [recent,setRecent]=useState([])
const [totalAmountIncome, setTotalAmountIncome] = useState(0);
const [totalAmountExpense, setTotalAmountExpense] = useState(0);
const [data, setData] = useState({
  datasets: [{
      data: [],
      backgroundColor:[
        'red',
        'blue',
        'yellow',
        'green',
        'browm',
        'black',
        'pink',
        'violet',
        'orange',
          'grey',
      ]
  },
],
labels: [
  'red',
  'blue',
  'yellow',
  'green',
  'browm',
  'black',
  'pink',
  'violet',
  'orange',
    'grey',
], 
});
const [datac, setDatac] = useState({
  datasets: [{
      data: [],
      backgroundColor:[
        'red',
        'blue',
        'yellow',
        'green',
        'browm',
        'black',
        'pink',
        'violet',
        'orange',
          'grey',
      ]
  },
],
labels: [
  'red',
  'blue',
  'yellow',
  'green',
  'browm',
  'black',
  'pink',
  'violet',
  'orange',
    'grey',
], 
});
const [datainc, setDatainc] = useState({
  datasets: [{
      data: [totalAmountIncome,totalAmountExpense],
      backgroundColor:[
        'red',
        'blue',
        'yellow',
        'green',
        'browm',
        'black',
        'pink',
        'violet',
        'orange',
          'grey',
      ]
  },
],
labels: [
  "income","expenditture"
], 
});
useEffect(()=> {
  const fetchData = async() =>  {

 try {
      const resd=await axios.get('http://localhost:8000/api/Transactions/aggregate')
const res=resd.data;
      console.log("resss", res)
      const label = [];
      const data = [];
      for(var i of res.expense) {
          label.push(i.category);
          data.push(i.totalAmount)
      }
      setData(
        {
          datasets: [{
              data:data,
              backgroundColor:[
                  'red',
                  'blue',
                  'yellow',
                  'green',
                  'browm',
                  'black',
                  'pink',
                  'violet',
                  'orange',
                    'grey',
              ]
          },
        ],
        labels:label, 
      }
      )
      const labelc = [];
      const datac = [];
      for(var i of res.income) {
          labelc.push(i.category);
          datac.push(i.totalAmount)
      }
      setDatac(
        {
          datasets: [{
              data:datac,
              backgroundColor:[
                  'red',
                  'blue',
                  'yellow',
                  'green',
                  'browm',
                  'black',
                  'pink',
                  'violet',
                  'orange',
                    'grey',
              ]
          },
        ],
        labels:labelc, 
      }
      )
      setDatainc(
        {
          datasets: [{
              data:[totalAmountIncome,totalAmountExpense],
              backgroundColor:[
                  'red',
                  'blue',
                  'yellow',
                  'green',
                  'browm',
                  'black',
                  'pink',
                  'violet',
                  'orange',
                    'grey',
              ]
          },
        ],
        labels:[
          "income","expenditture"
        ], 
       
      }
      )
      
    }
    catch(e) {
      console.log("error", e)
    }
  }
  fetchData();
}, [totalAmountExpense,totalAmountIncome])///////////


useEffect(() => {
  const fetchTotalAmount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/Transactions/sumexin', {
        params: {
          status: "income"
        }
      });
      setTotalAmountIncome(response.data[0].totalAmount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchTotalAmount();
}, [recent,incomes,expenses]);



useEffect(() => {
  const fetchTotalAmount = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/Transactions/sumexin', {
        params: {
          status: "expense"
        }
      });
      setTotalAmountExpense(response.data[0].totalAmount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchTotalAmount();
}, [recent,incomes,expenses]);



  const handleClick=async()=>{
try{
    await axios.post("http://localhost:8000/api/Transactions/",{
      name:name,
      amount:amount,
      status:status,
      category:categoryinc,

    }).then(()=>{
      setName("")
      setAmount(0)
      setStatus("income")
      setCategoryInc("")
    })

  }
  catch(err){
    console.log(err)
  }



  }

useEffect(()=>
{
  try{
  const getRecent=async()=>{
    const res=await axios.get("http://localhost:8000/api/Transactions/?new=true")
    
    setRecent(res.data)
  }
  getRecent()
} catch(err){
  console.log(err)
}
},[recent,incomes,expenses])

useEffect(()=>
{
  try{
  const getRecent=async()=>{
    const res=await axios.get("http://localhost:8000/api/Transactions/?status=income")
    
    setIncomes(res.data)
  }
  getRecent()
}catch(err){

}
},[incomes,recent,expenses])

useEffect(()=>
{  try{
  const getRecent=async()=>{
    const res=await axios.get("http://localhost:8000/api/Transactions/?status=expense")
    
    setExpenses(res.data)
  }
  getRecent()
}catch(err){}
},[incomes,recent,expenses])

const handleDelete=async(id)=>{
  await axios.delete(`http://localhost:8000/api/Transactions/${id}`).then(()=>console.log("De")).catch(err=>console.log)
}





  return (
    <div className="fullscreen">
      <div className="left">
           
          <input type="text" placeholder="Add Item Name" className="select" value={name}onChange={(e)=>setName(e.target.value)}/>
          <input type="number" placeholder="Add Amount"  className="select" value={amount} onChange={(e)=>{setAmount(e.target.value);console.log(Number.isInteger(parseInt(amount)))} }/>
          
          <select name="status" id="status"  className="select" onChange={(e)=>setStatus(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            </select>
           {status==="expense" && (
            <select name="categoryinc"   className="select" id="categoryinc" onChange={(e)=>setCategoryInc(e.target.value)}>
              <option value="">Choose Category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
            <option value="DailyExpense">Daily Expense</option>
            <option value="Education">Education</option>
            <option value="BillPayment">BillPayment</option>
            <option value="Rental">Rental</option>
            </select>
           )}


             {status==="income" && (
            <select name="categoryinc"  className="select" id="categoryinc" onChange={(e)=>setCategoryInc(e.target.value)}>
              <option value="">Choose Category</option>
            <option value="Job">Job</option>
            <option value="FreeLance">Freelance</option>
            <option value="PocketMoney">PocketMoney</option>
            <option value="FromRelatives">FromRelatives</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Youtube">Yotube</option>
            </select>
           )}


       {

        name!=="" && amount!=="" &&  categoryinc!=="" && status!=="" && (

          <div>

            <button onClick={handleClick}>Add Value To Database</button>


          </div>
        )

       }

      </div>
      <div className="middle">

            <div className="toptab">
            <div className="expense">
              <h1>Expense: Rs {totalAmountExpense}</h1>
            </div>
              <div className="income">
                <h1>Income:Rs {totalAmountIncome}</h1>
              </div>
            
            <div className="savings">
              <h1>{
                totalAmountIncome-totalAmountExpense < 0 ? <div style={{color:'red'}}>LOSS : Rs {totalAmountExpense-totalAmountIncome} </div>
               :<div style={{color:'green'}}>Savings : Rs { totalAmountIncome-totalAmountExpense}</div>
                
                }</h1>
            </div>
            </div>
            <div className="middletab" >
              <div className="expense" >
                <h1 >Expenditure Chart</h1>
                <Doughnut data={data}/>
      
     
              </div>
              <div className="income">
              <h1>Income Chart</h1>
              <Doughnut data={datac}/>
                
               
              </div>
              <div className="savings">
              <h1>Expense vs Income</h1>
              <Doughnut data={datainc}/>
                
               
              </div>


            </div>

          <div className="bottomtab">
            <div className="categoryexpensedetails">
              <h2>Last 5 Transaction History </h2>
            <div className="new">
            { recent.map((item)=>{
              return (<div>
                
                <div className="recent">
                   <div className="recentname">
                   {item.name}
                   </div>
                   <div className="amount">
                    Rs {item.amount}
                   </div>
                   <div className="date">
                    {item.createdAt.slice(0,10)}
                   </div>
                  {item.status}</div>


              </div>)
            })}

          </div>
            </div>
          </div>

      </div>
        <div className="right">

          <h1 className="categoryexpensedetails">Income</h1>
          <div className="incomes">
            
          { incomes.map((item)=>{
              return (<div className="division">  
                
                <div  ><div className="recentnames">
                
                   {item.name}
                   </div>
                   <div className="amounts">
                     Rs {item.amount}
                   </div>
                   <div className="amounts">
                    {item.category}
                   </div>
                   <div className="dates">
                    {item.createdAt.slice(0,10)}
                   </div>
                   <div   className="delete" onClick={()=>handleDelete(item._id)} >Delete</div>
                  </div>


              </div>)
            })}
          </div>
          <h1 className="categoryexpensedetails">Expenses</h1>
          <div className="expenses">
          { expenses.map((item)=>{
              return (<div className="division">
               <div ><div className="recentnames">
                
                   {item.name}
                   </div>
                   <div className="amounts">
                   Rs {item.amount}
                   </div>
                   <div className="amounts">
                    {item.category}
                   </div>
                   <div className="dates">
                    {item.createdAt.slice(0,10)}
                   </div>
                   <div  className="delete"onClick={()=>handleDelete(item._id)} >Delete</div>
                  </div>


              </div>)
            })}
           </div>
          
         


            
        </div>

      
      
    </div>
  )
}

export default App
