import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} _id - Unique ID for the product
 */


const Products = () => {

  const {enqueueSnackbar} = useSnackbar();


  const  [apiData ,setApiData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredproducts] = useState([]);
  const [timeout, setTimeoutId] = useState(0);
  const [searchText, setSearchText] = useState("")



  // TODO: CRIO_TASK_MODULE_PRODUCTS - Fetch products data and store it
  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const performAPICall = async () => {
    try{
    setLoading(true)
    let res =  await axios.get(`${config.endpoint}/products`);
    // let jsonData = await data.json();
    console.log(res.data,"data");
    setApiData(res.data);

    setFilteredproducts(res.data);
    
    
    }catch(e){
      console.log(e);
      enqueueSnackbar(e.response.data.message, { variant: "error" });
   }
   setLoading(false)
  };

  useEffect(()=>{
    performAPICall()
    console.log(apiData,"apidata");
  },[]);

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  const performSearch = async (text) => {
    console.log(text,"searchText");
    try{
    const data = await axios.get(`${config.endpoint}/products/search?value=${text}`);
    console.log(data.data,"searchData");
    setFilteredproducts(data.data);
    }catch(e)
    {
      setFilteredproducts([]);
    }
  };

  // useEffect(()=>{
  //   performSearch(searchText)
  // },[searchText])

  // const handleInput = (e)=>{
  //   setSearchText(e.target.value);
  // }

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */
  const debounceSearch = (event, debounceTimeout) => {
   
    let text  = event.target.value;
    
    if(debounceTimeout){
      clearTimeout(debounceTimeout);
    }

    let time  = setTimeout(async()=>{
      await performSearch(text)
    },500)

    // setSearchText(timeout);
    setTimeoutId(time);

  };







  return (
    <div>
      <Header>
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
        <TextField
        className="search-desktop"
        onChange={(e)=>debounceSearch(e,timeout)}
        placeholder="Search for items/categories"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        >
        </TextField>

      </Header>

      {/* Search view for mobiles */}
      <TextField
        className="search-mobile"
        size="small"
        
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
        onChange={(e)=>debounceSearch(e,timeout)}
      />
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>
       <Box>
       {loading?(
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} top={"50%"} height={"40vh"} flexDirection={"column"}  >
      <CircularProgress />
      <h1>Loading Products ....</h1>
      </Box>
       ):(

       filteredProducts.length?(
        
        <Grid container item p={2}>
        {filteredProducts.map((item)=>
          <Grid item xs={6} md={3} p={1}>
          <ProductCard 
          product ={item}

          />
          </Grid>

        )}
        </Grid>
       ):<h4>No Products Found</h4>
       
     
       
       )
       }
       </Box>
      <Footer />
    </div>
  );
};

export default Products;
