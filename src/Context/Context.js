/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export let context = createContext(null);
export default function ContextProvider(props) {
  let {userData} = useContext(AuthContext)
  const [ProductsData, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [categoryProducts, setCategoryProducts] = useState([])
  const [brandProducts, setBrandProducts] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [brands, setBrands] = useState([])
  const [Cart, setCart] = useState({products: []});
  const [Wishlist, setWishlist] = useState([])
  const [Orders, setOrders] = useState([])
  const [address, setAddress] = useState([])
  async function callAPI(method, endpoint,params) {
    try {
      const {data} = await axios({
        method,
        url: `${process.env.REACT_APP_BASE_URL}${endpoint}`,
        params
      });
      return data;
    } catch (error) {
      if(error.message ==="Network Error"){
        toast.error("Network Error",{duration:1000,className:"text-success px-4 fw-bolder  "}); 
      }else {
        throw new Error(`Failed to call API: ${error.message}`);
      }
    }
  }
  async function callAPIWithToken(method, endpoint, body) {
    try {
      if(localStorage.getItem('token')){
        const { data } = await axios({
          method,
          url: `${process.env.REACT_APP_BASE_URL}${endpoint}`,
          headers: {
              token: localStorage.getItem('token'),
            },
          data: body,
        }); 
      toast.success(data.message,{duration:1000,className:"text-success px-4 fw-bolder"});
      return data;
      }
    } catch (error) {
      if(error.message ==="Network Error"){
        toast.error("Network Error",{duration:1000,className:"text-success px-4 fw-bolder  "}); 
      }
      else if (error.response && error.response.data) {
        toast.error(error.response.data.message,{duration:1000,className:"text-success px-4 fw-bolder  "}); 
      } else {
        toast.error(error.message,{duration:1000,className:"text-success px-4 fw-bolder  "}); 
        throw new Error(`Failed to call API with token: ${error.message}`);
      }
    }
  }

  async function getProducts(sort = 'title', minPrice = 0, maxPrice = 1000000, page = '1') {
    let data = await callAPI('get','/products', 
      {
        sort,
        'price[gte]': minPrice,
        'price[lte]': maxPrice,
        page,
      },
    );
    setProducts(data);
  }

  async function getCategoryProducts(sort = 'title', minPrice = 0, maxPrice = 1000000, page = '1',category) {
    let data = await callAPI('get','/products', 
      {
        sort,
        'price[gte]': minPrice,
        'price[lte]': maxPrice,
        page,
        'category[in]':category
      },
    );
    setCategoryProducts(data);
  }

  async function getBrandProducts(sort = 'title', minPrice = 0, maxPrice = 1000000, page = '1',brand) {
    let data = await callAPI('get','/products', 
      {
        sort,
        'price[gte]': minPrice,
        'price[lte]': maxPrice,
        page,
        brand
      },
    );
    setBrandProducts(data);
  }

  const getAllCategories = async () => {
    let data = await callAPI('get','/categories');
    if(data){
      setCategory(data.data);
    }
  }

  const getAllSubCategories = async () => {
    let data = await callAPI('get','/subcategories');
    if(data){
      setSubCategory(data.data);
    }
  }

  const getAllOrders = async () => {
      if(userData){
        let data = await callAPI('get',`/orders/user/${userData.id}`);
        if(data){
          setOrders(data);
        }}
  }

  const getAllBrand = async () => {
    let data = await callAPI('get','/brands');
    if(data){
      setBrands(data.data);
    }
  }

  const addToCart = async (productId)=>{
    let {data} = await callAPIWithToken('post','/cart',{
      productId
    })
    setCart(data);
  }
  const deleteFromCart = async (productId)=>{
      let {data}=await callAPIWithToken('delete',`/cart/${productId}`)
      setCart(data);
      toast.success('Product removed successfully to your Cart',{duration:1000,className:"text-success px-4 fw-bolder"}); 
  }
  
  /*
  const deleteCart = async ()=>{
    await callAPIWithToken('delete',`/cart`)
  }
  */
  
  const updateCountCart = async (count,productId)=>{
      let {data}=await callAPIWithToken('put',`/cart/${productId}`,{count})
      if(count === 0){
        deleteFromCart(productId);
      }else{
        setCart(data);
      }
  }

  const getCart = async ()=>{
      let data = await callAPIWithToken('get','/cart')
      if(data){
        setCart(data.data);
      }
  }

  const addToWishlist = async (productId)=>{
    await callAPIWithToken('post','/wishlist',{
      productId
    })
    const productToAdd = ProductsData.data.find(item => item._id === productId);
    setWishlist([...Wishlist, productToAdd]);
  }

  const deleteFromWishlist = async (productId)=>{
    await callAPIWithToken('delete',`/wishlist/${productId}`)
    setWishlist(Wishlist.filter((item) => item._id !== productId));
  }
  const getWishlist = async ()=>{
    let data = await callAPIWithToken('get','/wishlist')
    if(data){
      setWishlist(data.data);
    }
  }

  const deleteAddress = async (addressId)=>{
    let {data}=await callAPIWithToken('delete',`/addresses/${addressId}`)
    setAddress(data);
  }

  const getAddress = async ()=>{
    if(userData){
      let {data} = await callAPIWithToken('get','/addresses')
      if(data){
        setAddress(data);
      }
    }
  }

  const Order = async(value)=>{
    let {data} =  await callAPIWithToken('post' , `/orders/${Cart._id}`,{
      shippingAddress:value
    })
    toast.success(`The order was created successfully and total Order Price = ${data.totalOrderPrice}`,{duration:1000,className:"text-success px-4 fw-bolder"}); 
    setCart({ products: [] , cartOwner: userData.id  })
  }

  useEffect(() => {
      getAllCategories();
      getAllSubCategories();
      getAllBrand();
      getProducts();
      getCategoryProducts()
      getWishlist();
      getCart();
  }, [])

  useEffect(() => {
      getAllOrders();
      getAddress()
  }, [userData])

  
  return (
    <context.Provider
      value={{getProducts,getCategoryProducts,getBrandProducts,
        addToCart,deleteFromCart,updateCountCart,Cart,getCart,
        addToWishlist,deleteFromWishlist,Wishlist,
        Orders,address,setAddress,deleteAddress,Order,
        brandProducts,categoryProducts,ProductsData,category,subCategory,brands}}
    >
      {props.children}
    </context.Provider>
  );
}