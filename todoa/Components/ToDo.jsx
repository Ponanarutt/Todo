

import React, { useState } from 'react'

const ToDo = () => {



    return (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <td className="px-6 py-4">Study</td>
              <td className="px-6 py-4">Learn Next JS PC</td>
              <td className="px-6 py-4">Pnding</td>
              <td className='px-6 py4 '>
                <botton className="py-2 px-4 mr-1 bg-red-500 text-white">Delete</botton>
                <botton className='py-2 px-4 mr-1 bg-green-500 text-white'>Done</botton>
              </td>
            </tr>
        
    )
}

export default ToDo
