import React, { useEffect, useState } from 'react'

const UseEffectAPI = () => {
  const [value, setValue] = useState("");
  const [product, setProduct] = useState({
    products: []
  });
  const [Categories, setCategories] = useState([])

  const getProduct = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    setProduct(await response.json());
    //  console.log(response);
  }

  const getCategories = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    setCategories(await response.json());
    //  console.log(response);
  }

  useEffect(() => {
    getCategories()
    getProduct();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault()
    const response = await fetch(`https://dummyjson.com/products/search?q=${value}`)
    setProduct(await response.json());
  };

  const handleCategory = async (e) => {
    setValue("")
    const response = await fetch(`https://dummyjson.com/products/category/${e.target.value}`)
    setProduct(await response.json());
  }

  const handleReset = () => {
    setValue("")
    setCategories([])
    getProduct();
    getCategories()
  };

  return (
    <>
      <h2>test project</h2>
      <form className='d-flex ms-1' onSubmit={(e) => handleSearch(e)}>
        <input
          type="text"
          className='form-control '
          placeholder='search product.....'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className='mx-2 rounded-3 px-2 bg-white border-light border' type='button' onClick={(e) => handleSearch(e)}>Search</button>
        <button className='rounded-3 px-2 bg-white border-white border' type='button' onClick={() => handleReset()}>Reset</button>
        <select className='rounded-3 mx-2' onChange={(e) => handleCategory(e)}>
          <option value="">Select Category</option>
          {Categories?.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </form>
      <div className='container-fluid mt-5' >
        <div className="row text-center">
          {
            product.products.map((item) => {
              return (


                <div className="col-10 col-md-4 mt-5">
                  <div className="card p-2">
                    <div className="d-flex align-item-center">
                      <div className="image"><img src={item.thumbnail} alt="" className='rounded' width="155" /></div>
                      <div className="ml-3 w-100">
                        <h4 className='mb-0 mt-0 textleft'>Price:{item.price}</h4><span className='textleft text-danger'>Up to{item.discountPercentage}% Off</span>
                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                          <div className="d-flex flex-coloumn"> <span className='articles'> </span> <span className='number1'>{item.brand}</span></div>
                          <div className="d-flex flex-coloumn"> <span className='followers'>Rating:</span> <span className='number2'>{item.rating}</span></div>
                          <div className="d-flex flex-coloumn"> <span className='rating'>Stock</span> <span className='number3'>{item.stock}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>)
            })
          }
        </div>
      </div>
    </>
  )
}

export default UseEffectAPI