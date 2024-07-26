import React, { useEffect, useState } from 'react'
import "./ListProduct.css"
import remove_icon from "../../assets/cross_icon.png"

const ListProduct = () => {
  const [allProducts,setallProducts] = useState([])

  const fetchInfo =async ()=>{
      await fetch("http://localhost:4000/allproducts")
      .then((res)=>res.json())
      .then((data)=>{setallProducts(data)})
  }

  useEffect(()=>{
    fetchInfo()
  },[])

  const remove_product = async (id)=>{
    await fetch("http://localhost:4000/removeproduct",{
      method:"POST",
      headers:{
        Accept:"applicatiom/json",
        "content-type":"application/json"
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo()
  }

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-formatmain">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allProducts">
        <hr />
        {
          allProducts.map((product,index)=>{
            return <div key={index}>
             <div  className="listproduct-formatmain listproduct-format">
                <img  src={product.image} alt="" className="listproduct-img" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} src={remove_icon} alt="" className="listproduct-remove-icon" />
            </div>
            <hr />
            </div>
          })
        }

      </div>
    </div>
  )
}

export default ListProduct