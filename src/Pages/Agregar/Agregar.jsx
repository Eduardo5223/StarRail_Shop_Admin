import React, { useEffect, useState } from 'react'
import './Agregar.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'

const Agregar = ({url}) => {
  const [image,setImage] = useState(false)
  const [data,setData] = useState({
    nombre: "",
    sku: "",
    plataforma: "xbox",
    precio: ""
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;

    setData(data=>({...data,[name]:value}))
  }

  useEffect(()=>{
    console.log(data)
  },[data])

  const onSubmitHandler = async (event) =>{
    event.preventDefault()
    const formData = new FormData()
    formData.append("nombre", data.nombre)
    formData.append("sku", Number(data.sku))
    formData.append("plataforma", data.plataforma)
    formData.append("precio", Number(data.precio))
    formData.append("image", image)
    const response = await axios.post(`${url}/api/producto/add`, formData)
    if(response.data.success){
        setData({
          nombre: "",
          sku: "",
          plataforma: "xbox",
          precio: ""
        })
        setImage(false)
        toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Subir Imagen</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
        </div>
        <div className="add-product-name flex-col">
          <p>Nombre del Producto</p>
          <input onChange={onChangeHandler} value={data.nombre} type="text" name='nombre' placeholder='Agregue el nombre'/>
        </div>
        <div className="add-product-sku flex-col">
          <p>SKU del producto</p>
          <input onChange={onChangeHandler} value={data.sku} type="Number" name='sku' placeholder='0'/>
        </div>
        <div className="add-plataforma-precio">
          <div className="add-plataforma flex-col">
            <p>Plataforma</p>
            <select onChange={onChangeHandler} value={data.plataforma} name="plataforma">
              <option value="xbox">xbox</option>
              <option value="ps5">ps5</option>
              <option value="ns">ns</option>
              <option value="other">other</option>
            </select>
          </div>
          <div className="add-precio flex-col">
            <p>Precio</p>
            <input onChange={onChangeHandler} value={data.precio} type="Number" name='precio' placeholder='0'/>
          </div>
        </div>
        <button type='submit' className='add-btn'>Agregar</button>
      </form>
    </div>
  )
}

export default Agregar