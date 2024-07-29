import { BrowserRouter, Routes, Route, json } from "react-router-dom";
import "./App.css";
import Home from "./elements/Home";
import About from "./elements/About";
import Contact from "./elements/Contact";
import Register from "./elements/Register";
import Login from "./elements/Login";
import { useEffect, useState } from "react";
import Navbar from "./elements/home/Navbar";
import Footer_ from "./elements/home/Footer_";
import Profile from "./elements/Profile";
import Dashboard from "./admin/Dashboard";
import Users from "./admin/Users";
import Queries from "./admin/Queries";
import Categories from "./admin/category/Categories";
import Addcategory from "./admin/category/Addcategory";
import AdminProduct from "./admin/product/AdminProduct";
import Updateproduct from "./admin/product/Updateproduct";
import AddProduct from "./admin/product/AddProduct";
import Updateexpert from "./admin/expert/Updateexpert";
import AllProducts from "./elements/AllProducts";
import AllCategory from "./elements/AllCategory";
import FilterProducts from "./elements/FilterProducts";
import MyCart from "./elements/MyCart";
import axios from "axios";
import MyOrders from "./elements/MyOrders";
import AllOrders from "./admin/AllOrders";
import RegisterVendor from "./elements/RegisterVendor";
import LoginVendor from "./elements/LoginVendor";
import VendorDashboard from "./vendor/VendorDashboard";
import VendorSidebar from "./vendor/VendorSidebar";
import VendorCategory from "./vendor/category/VendorCategory";
import VendorProduct from "./vendor/product/VendorProduct";
import VendorAddCat from "./vendor/category/VendorAddCat";
import VendorAddPro from "./vendor/product/VendorAddPro";
import VendorOrders from "./vendor/VendorOrders";
import AllVendors from "./elements/AllVendors";
import FilterVendors from "./elements/FilterVendors";
import Vendors from "./elements/home/Vendors";
import AdminVendor from "./admin/expert/AdminVendor";
import Addvendor from "./admin/expert/Addvendor";
import VendorProfile from "./vendor/VendorProfile";
import VendorUpdatePro from "./vendor/product/VendorUpdatePro";
import URL from "./config";

function App() {
  const [loggeduser, setloggeduser] = useState(null);
  const [count, setcount] = useState(0);

  useEffect(() => {
    getproBycart();
  }, [loggeduser]);

  const getproBycart = async () => {
    try {
      const response = await axios.get(
        `${URL}/getcartByUserId/${loggeduser._id}`
      );
      console.log("Cart", response.data.cart);
      const mainRec = response.data.cart;
      const filteredRec = mainRec.filter((item) => item.status === "pending");
      setcount(filteredRec.length);
      console.log("Count", filteredRec.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("loggedUser");
    if (data) {
      const data_user = JSON.parse(data);
      setloggeduser(data_user);
    }
    console.log(loggeduser);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar
          loggeduser={loggeduser}
          setloggeduser={setloggeduser}
          count={count}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setloggeduser={setloggeduser} />}
          />
          <Route
            path="/profile"
            element={
              <Profile loggeduser={loggeduser} setloggeduser={setloggeduser} />
            }
          />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/allusers" element={<Users />} />
          <Route path="/allqueries" element={<Queries />} />
          <Route path="/category" element={<Categories />} />
          <Route
            path="/addcategory"
            element={<Addcategory loggeduser={loggeduser} />}
          />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/adminvendors" element={<AdminVendor />} />
          <Route path="/addvendor" element={<Addvendor />} />
          <Route path="/updateexpert/:expId" element={<Updateexpert />} />
          <Route path="/products" element={<AdminProduct />} />
          <Route path="/updateproduct/:proId" element={<Updateproduct />} />
          <Route
            path="/addproduct"
            element={<AddProduct loggeduser={loggeduser} />}
          />
          <Route path="/allvendors" element={<AllVendors />} />
          <Route
            path="/allproducts"
            element={
              <AllProducts
                loggeduser={loggeduser}
                getproBycart={getproBycart}
              />
            }
          />
          <Route path="/allcategory" element={<AllCategory />} />
          <Route
            path="/filterproducts/:catId"
            element={<FilterProducts loggeduser={loggeduser} />}
          />
          <Route
            path="/mycart"
            element={<MyCart loggeduser={loggeduser} setcount={setcount} />}
          />
          <Route
            path="/myorders"
            element={<MyOrders loggeduser={loggeduser} />}
          />
          <Route path="/allorders" element={<AllOrders />} />
          <Route path="/registerVendor" element={<RegisterVendor />} />
          <Route
            path="/loginVendor"
            element={<LoginVendor setloggeduser={setloggeduser} />}
          />
          <Route
            path="/vendor"
            element={<VendorDashboard loggeduser={loggeduser} />}
          />
          <Route path="/sidevendor" element={<VendorSidebar />} />
          <Route
            path="/vendorcategory"
            element={<VendorCategory loggeduser={loggeduser} />}
          />
          <Route
            path="/VendorAddCat"
            element={<VendorAddCat loggeduser={loggeduser} />}
          />
          <Route
            path="/vendorproduct"
            element={<VendorProduct loggeduser={loggeduser} />}
          />
          <Route
            path="/VendorAddPro"
            element={<VendorAddPro loggeduser={loggeduser} />}
          />
          <Route
            path="/vendorOrder"
            element={<VendorOrders loggeduser={loggeduser} />}
          />
          <Route
            path="/filtervendors/:venId"
            element={<FilterVendors loggeduser={loggeduser} />}
          />
          <Route
            path="vendorprofile"
            element={
              <VendorProfile
                loggeduser={loggeduser}
                setloggeduser={setloggeduser}
              />
            }
          />
          <Route
            path="/vendorupdateproduct/:proId"
            element={<VendorUpdatePro />}
          />
        </Routes>
        <Footer_ />
      </BrowserRouter>
    </>
  );
}

export default App;
