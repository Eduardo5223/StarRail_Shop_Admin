import React, { useEffect, useState } from 'react'
import './Lista.css'
import axios from "axios"
import {toast} from "react-toastify"
const Lista = ({url}) => {
  const [list,setList] = useState([]);

  const fetchList = async () =>{
    const response = await axios.get(`${url}/api/producto/list`);
    console.log(response.data);
    if(response.data.success){
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeProd = async(prodSku) =>{
    const response = await axios.post(`${url}/api/producto/remove`,{sku:prodSku});
    await fetchList()
  }
  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <p>Todos los Productos</p>
      <div className="list-table-format title">
        <b>Imagen</b>
        <b>Nombre</b>
        <b>SKU</b>
        <b>Plataforma</b>
        <b>Precio</b>
        <b>Accion</b>
      </div>
      {list.map((item,index)=>{
        return(
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/`+item.image} alt="" />
            <p>{item.nombre}</p>
            <p>{item.sku}</p>
            <p>{item.plataforma}</p>
            <p>{item.precio}</p>
            <p onClick={()=>removeProd(item.sku)} className='cursor'>X</p>
          </div>
        )
      })}
    </div>
  )
}

export default Lista