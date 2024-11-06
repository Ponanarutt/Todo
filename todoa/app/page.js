'use client'

import ToDo from "@/Components/ToDo";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  
  const [formData ,setformData] = useState({
    title:"",
    description:""
    
  });

  const onChageHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value
    setformData(form => ({...formData,[name]:value}))
    console.log(formData);
  }
  
  const onSubmithandle = async (e) => {
    e.preventDefault(); // mai hai re page
    try{

    } catch(error){

    }
    
    
  }

  return (

    
    <>
      <form onSubmit={onSubmithandle} className="flex-item-start flex-col gap-2 w-[80%] max-w-[600px] mt-28 px-2 mx-auto">
        <input
          value={formData.title}
          onChange={onChageHandler}
          type="text"
          name="title"
          placeholder="Enter Title"
          className="px-3 py-2 border-2 w-full"
        ></input>
        <textarea
          value={formData.description} // ผูกค่าเข้้ากับฟรอม
          onChange={onChageHandler}
          name="description"
          placeholder="Enter Desription"
          className="mt-3 mb-4 px-3 py-2 border-2 w-full"
        ></textarea>
        <botton type="submit" className="bg-orange-600 py-3 px-11 text-white">
          Add Todo
        </botton>
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
            <ToDo/>
            <ToDo/>
            <ToDo/>
          </tbody>
          
        </table>
      </div>
    </>
  );
}
