import React from "react";
import Layout from "../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact-Us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contact.webp"
            alt="contactus"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
        <div className="col-md-4">
          <b className="text-justify mt-2">
            Any query and info about product feel free to call anytime we 24X7
            vaialible.
          </b>
          <p className="mt-3">
            <BiMailSend /> : www.help@StyleSphere.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 01-523523
          </p>
          <p className="mt-3">
            <BiSupport /> : 1600-0000-0000 (Toll Free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
