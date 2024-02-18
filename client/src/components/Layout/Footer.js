import React from "react";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeIcon from "@mui/icons-material/Home";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { BiPhone } from "react-icons/bi";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const Footer = () => {
  return (
    <div className="footer">
      {/* <h4 className="text-center">All Right Reserved &copy; Fashion Wear</h4>
      <p className="text-center mt-3">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy & Policy</Link>
      </p> */}


      <footer
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        <section
          className="d-flex justify-content-between p-4 text-white"
          style={{ backgroundColor: "#999" }}
        >
          <div className="me-5">
            <span>Get connected with us on social networks:</span>
          </div>

          <div>
            <Link href className="text-white me-4">
              <i className="fab fa-facebook-f" />
            </Link>
            <Link href className="text-white me-4">
              <FacebookIcon />
            </Link>
            <Link href className="text-white me-4">
              <GoogleIcon />
            </Link>
            <Link href className="text-white me-4">
              <InstagramIcon />
            </Link>
            <Link href className="text-white me-4">
              <GitHubIcon />
            </Link>
          </div>
        </section>

        <section className>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Style-Sphere</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>-"Style Sphere: Where Trend Meets Timeless Elegance"</p>
                <p>-"Style Sphere: Elevate Your Style"</p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <Link className="text-dark">Sneakers</Link>
                </p>
                <p>
                  <Link className="text-dark">Classic Clothes</Link>
                </p>
                <p>
                  <Link className="text-dark">Summer Product</Link>
                </p>
                <p>
                  <Link className="text-dark">Wedding Vibes</Link>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <Link to="/about" className="text-dark">
                    About Us
                  </Link>
                </p>
                <p>
                  <Link to="/contact" className="text-dark">
                    Contact Us
                  </Link>
                </p>
                <p>
                  <Link to="/policy" className="text-dark">
                    Privacy & Policy
                  </Link>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <HomeIcon /> Neupanegau:Bhaktapur-Nepal
                </p>
                <p>
                  <MailOutlineIcon /> info@style-sphere.com
                </p>
                <p>
                  <BiPhone />+ 01 234 567 88
                </p>
                <p>
                  <LocalPrintshopIcon /> + 01 234 567 89
                </p>
              </div>
            </div>
          </div>
        </section>
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2023 Copyright:
          <Link className="text-dark">StyleSphere.com</Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
