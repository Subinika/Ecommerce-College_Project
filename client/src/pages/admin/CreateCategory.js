import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AminMenu from "../../components/Layout/AminMenu";
import axios from "axios";
import CategoryForms from "../../components/Forms/CategoryForms";
import { Modal } from "antd";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updated, setUpdated] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        alert(`Successfully Created Category ${data?.category.name}`);
        getAllCategory();
        setName("");
      } else {
        alert("Error Creating Category");
      }
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong");
    }
  };

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

  const submitUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updated }
      );
      if (data.success) {
        alert("Category Updated Success");
        setSelected(null);
        setUpdated("");
        setVisible(false);
        getAllCategory();
      } else {
        alert("Update Fail");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong updating category.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`,
        { name: updated }
      );
      if (data.success) {
        alert("Category Delete Success");
        getAllCategory();
      } else {
        alert("Update Fail");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong updating category.");
    }
  };

  return (
    <Layout title={"Create-Category"}>
      <div className="container-fluid m-3 ">
        <div className="row">
          <div className="col-md-3">
            <AminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="p-2">Create Categories</h3>
            <div className="p-3 w-50">
              <CategoryForms
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <h3 className="p-2">Manage Category</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button
                            className="btn EditBtn btn-primary me-5"
                            onClick={() => {
                              setVisible(true);
                              setUpdated(c.name);
                              setSelected(c);
                            }}
                          >
                            Edit
                          </button>

                          <DeleteForeverIcon
                            onClick={() => {
                              handleDelete(c._id);
                            }}
                            style={{
                              color: "red",
                              fontSize: "40px",
                              left: "10px",
                              cursor : 'pointer'
                            }}
                          />
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              {" "}
              <CategoryForms
                value={updated}
                setValue={setUpdated}
                handleSubmit={submitUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
