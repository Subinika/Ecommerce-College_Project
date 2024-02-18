import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  //For Algorithm
  const [products, setProducts] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [similar, setSimilar] = useState([]);

  //get All Products
  const getAllPorducts = async (req, res) => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setProducts(data.allProducts);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllPorducts();
  }, []);

  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //Algorithm

  // Function to calculate TF-IDF for a given document
  function calculateTFIDF(document, corpus) {
    // Implement TF-IDF calculation logic here
    // Return a dictionary of term-to-TF-IDF scores
    // For simplicity, we'll just return an object with placeholder values
    if (!document || !corpus) {
      return {}; // Return an empty object if document or corpus is missing
    }
    const tfidf = {};
    const terms = document.toLowerCase().split(" "); // Split description into terms
    for (const term of terms) {
      const termFrequency = corpus.reduce((count, productDescription) => {
        const descriptionTerms = productDescription.toLowerCase().split(" ");
        return count + descriptionTerms.filter((word) => word === term).length;
      }, 0);
      const inverseDocumentFrequency = Math.log(corpus.length / termFrequency);
      tfidf[term] = termFrequency * inverseDocumentFrequency;
    }
    return tfidf;
  }

  // Function to calculate cosine similarity between two TF-IDF vectors
  function calculateSimilarity(tfidf1, tfidf2) {
    // Implement cosine similarity calculation here
    // Return the cosine similarity score
    const dotProduct = Object.keys(tfidf1).reduce(
      (sum, term) => sum + tfidf1[term] * (tfidf2[term] || 0),
      0
    );
    const magnitude1 = Math.sqrt(
      Object.values(tfidf1).reduce((sum, value) => sum + value ** 2, 0)
    );
    const magnitude2 = Math.sqrt(
      Object.values(tfidf2).reduce((sum, value) => sum + value ** 2, 0)
    );
    return dotProduct / (magnitude1 * magnitude2);
  }

  // Create a corpus by extracting product descriptions from products
  const corpus = products.map((product) => product.description);

  // Calculate TF-IDF for the searched product's description
  const searchedProductTFIDF = calculateTFIDF(product.description, corpus);

  // Find and rank similar products using TF-IDF
  const similarProducts = products
    .map((product) => {
      const similarityScore = calculateSimilarity(
        searchedProductTFIDF,
        calculateTFIDF(product.description, corpus)
      );
      return { product, similarityScore };
    })
    .sort((a, b) => b.similarityScore - a.similarityScore) // Sort by similarity in descending order
    .slice(1, 5); // Get the top 4 similar products
  console.log("Top 4 similar products:", similarProducts);

  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt="..."
            style={{ height: "350px", width: "500px" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : ${product.price}</h6>

          
          <h6>Category : {product?.category?.name}</h6>
          <button
            class="btn btn-secondary mt-5"
            onClick={() => {
              setCart([...cart, product]);
              alert("Item Added to Cart");
              toast.success("Item Added to Cart");
            }}
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h4 className="text-center">Products You May Like</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex  ">
          {similarProducts.map((p) => (
            <div
              key={p._id}
              className="text-dark"
              style={{ textDecoration: "none" }}
            >
              <div
                className="card m-3 p-3"
                style={{ width: "18rem" }}
                key={p._id}
              >
                <img
                  src={`/api/v1/product/product-photo/${p.product._id}`}
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
                    <h5 className="card-title">{p.product.name}</h5>
                    <h6>${p.product.price} </h6>
                  </div>
                  <h5>Score : {p.similarityScore}</h5>
                  <p
                    className="card-text"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.product.description}
                  </p>
                  <button
                    className="btn  btn-secondary ms-2 "
                    onClick={() => navigate(`/product/${p.product.slug}`)}
                  >
                    See Details
                  </button>
                  <ShoppingCartIcon
                    className="ms-5"
                    style={{ fontSize: "45px" }}
                    onClick={() => {
                      setCart([...cart, p]);
                      alert("Item Added to Cart");
                      toast.success("Item Added to Cart");
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
