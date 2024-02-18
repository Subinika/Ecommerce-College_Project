import React from "react";
import Layout from "../../components/Layout/Layout";
import AminMenu from "../../components/Layout/AminMenu";

const AdminDashboard = () => {
  return (
    <Layout title={"Admin-Dashboard"}>
      <div className="container-fluid m-3 ">
        <div className="row">
          <div className="col-md-3">
            <AminMenu />
          </div>
          <div className="col-md-9">
            <img
              src="/images/admin.jpeg"
              alt="contactus"
              style={{ width: "500px", height: "500px", marginLeft: "180px" }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
