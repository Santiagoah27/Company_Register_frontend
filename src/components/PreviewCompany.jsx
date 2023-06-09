import React from 'react'
import { Link } from "react-router-dom"
const PreviewCompany = ({company}) => {
    const { name, NIT, _id } = company 
  return (
    <div className="border-b p-5 flex">
        <p className="flex-1">
            {name}
            <span className="text-sm text-gray-500 uppercase">{' | '}
            {NIT}</span>
        </p>

        <Link 
           to={`${_id}`}
           className='text-gray-600 hover:text-gray-800 uppercase text-sm font-bold'
        >
            Ver Empresa
        </Link>
    </div>
  )
}

export default PreviewCompany