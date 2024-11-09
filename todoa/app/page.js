'use client'

import ToDo from "@/Components/ToDo";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  
  const [formData ,setformData] = useState({
    title:"",
    description:""
    
  });

  const [todoData, setTodoData] = useState([]);


  const fetchTodos = async () => {

    const response = await axios('/api') // ขอข้อมูลจากดดเส้นนี้
    setTodoData(response.data.todos)
 
  }

  const deleteTodo = async (mongoId) => {
    console.log(mongoId)
      const response = await axios.delete('/api',{
        params:{
          mongoId:mongoId
        }
      })

      toast.success(response.data.msg);
      fetchTodos();
  }

  useEffect(()=>{
  
    fetchTodos()
  
  },[]) // ขอตอนเริ่ม

  const onChageHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setformData(form => ({...formData,[name]:value}))
    console.log(formData);
  }
  
  const onSubmithandle = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      //sent the pacgage of the data in jason file 
      const response = await axios.post('/api',formData);
      // console.log('Submitting:', formData); // Log form data on submit
      toast.success(response.data.msg);
      setformData({
        title:"",
        description:""
        
      })
      fetchTodos();
      // You can add additional logic for handling the submitted data here.
    } catch (error) {
      toast.error('Submission failed'); // Handle errors
    }
  };

  const completeTodo = async (id) => {
    try {
      const response = await axios.put(
        '/api',
        {}, // No data to send in the body, so just an empty object
        {
          params: {
            mongoId: id, // Pass the `mongoId` as a query parameter
          },
        }
      );
  
      toast.success(response.data.msg);
      fetchTodos(); // Refresh the list after marking as complete
    } catch (error) {
      toast.error("Failed to mark todo as completed");
    }
  };
  
  return (

    
    <>
      <ToastContainer theme= "dark"/>
      <form
        onSubmit={onSubmithandle}
        className="flex-item-start flex-col gap-2 w-[80%] max-w-[600px] mt-28 px-2 mx-auto"
      >
        <input
          value={formData.title}
          onChange={onChageHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          value={formData.description}
          onChange={onChageHandler}
          name="description"
          placeholder="Enter Description"
          className="mt-3 mb-4 px-3 py-2 border-2 w-full"
        />
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Desription
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item,index)=>{
              console.log(item._id)
              return<ToDo completeTodo={completeTodo} key={index} title={item.title} id={index} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} />
            })}
            
          </tbody>
          
        </table>
      </div>
    </>
  );
}
