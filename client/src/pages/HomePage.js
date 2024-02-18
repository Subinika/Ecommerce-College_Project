import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/cart";

const Homepage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [checked, setChecked] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllPorducts = async (req, res) => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllPorducts();
  }, []);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong while Fetching All Categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllPorducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"Home"}>
      <div>
        <div
          id="demo"
          className="carousel slide"
          style={{ border: "none !important" }}
          data-bs-ride="carousel"
        >
          {/* Indicators/dots */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to={0}
              className="active"
            />
            <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
            <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
          </div>
          {/* The slideshow/carousel */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/images/banner.jpg"
                alt="Los Angeles"
                className="d-block"
                style={{ width: "100%", height: "250px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/banner2.jpg"
                alt="Chicago"
                className="d-block"
                style={{ width: "100%", height: "250px" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="/images/banner3.jpg"
                alt="New York"
                className="d-block"
                style={{ width: "100%", height: "250px" }}
              />
            </div>
          </div>
          {/* Left and right controls/icons */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" />
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#demo"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" />
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-2">
          <h5 className="text-center mt-4 ms-4" >Filter By Category</h5>
          <div className="d-flex flex-column ms-5">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4 ms-4">Filter By Price</h4>
          <div className="d-flex flex-column ms-5">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column mt-4 ms-4">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          <h4 className="text-center mt-4 ms-4">Advertisement</h4>
          <div className="m-2">
            <img
              src="/images/coke.jpg"
              alt="ad"
              style={{ width: "280px", height: "auto", borderRadius: "10px" }}
            />
          </div>
        </div>
        <div className="col-md-10">
          <div className="d-flex flex-wrap ms-5">
            {products.map((p) => (
              <div
                key={p._id}
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div
                  className="card m-3 p-3"
                  style={{ width: "20rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="..."
                    style={{ height: "200px" }}
                  />
                  <div className="card-body">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h5 className="card-title">{p.name}</h5>{" "}
                      <h6>${p.price} </h6>
                    </div>
                    <p
                      className="card-text"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {p.description}
                    </p>
                    <button
                      className="btn  btn-secondary ms-2 "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      See Details
                    </button>
                    <ShoppingCartIcon
                      className="cart ms-5"
                      style={{ fontSize: "45px" }}
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        alert("Item Added to Cart");
                        toast.success("Item Added to Cart");
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center m-2">
            {products && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
