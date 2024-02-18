import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h6 className="text-center m-2">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="col-md-12 d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "20rem" }}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  style={{ height: "200px" }}
                  alt={p.name}
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
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
