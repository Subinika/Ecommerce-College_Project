import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About-Us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about-us.avif"
            alt="contactus"
            style={{ marginTop: "20px", width: "80%", height: "auto" }}
          />
        </div>
        <div className="col-md-4">
          <b className="text-justify mt-2">
            We are here to provide a wide range of shopping experience in
            fashion established in 2023. Discover the latest trends, timeless
            classics, and your new favorite pieces at Style Sphere. We believe
            that great style should be effortless. Step in, and let your fashion
            journey begin.
          </b>
        </div>
      </div>
    </Layout>
  );
};

export default About;
