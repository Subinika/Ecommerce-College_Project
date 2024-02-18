import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy & Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy-policy.png"
            alt="contactus"
            style={{ width: "80%", height: "auto" }}
          />
        </div>
        <div className="col-md-4">
          <b className="text-justify mt-2">
            Your privacy matters to us. At Style Sphere, we respect your
            personal information. We only collect what's necessary to process
            your orders and keep you updated. We don't share your data without
            your consent. Shop with confidence knowing your privacy is our
            priority.
          </b>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
