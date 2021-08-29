import { useState } from "react";
import Layout from "../../layout";
import DynamicForm from "../../components/dynamicForm";
import * as styles from "./addProduct.module.scss";
import { useHistory } from "react-router-dom";
function AddProduct() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    SKU: "",
    name: "",
    price: "",
    type: "DVD",
  });
  const [status, setStatus] = useState({
    code: 0,
    title: "",
    message: "",
  });
  const [properties, setProperties] = useState({
    type: formData.type,
    size: 0,
  });
  function handleChange(e) {
    const { name, value, type } = e.target;
    if (name === "type") {
      setFormData({ ...formData, [name]: value });
      value === "DVD" && setProperties({ type: value, size: 0 });
      value === "Book" && setProperties({ type: value, weight: 0 });
      value === "Furniture" &&
        setProperties({
          type: value,
          dimensions: {
            height: 0,
            width: 0,
            length: 0,
          },
        });
    } else {
      if (type === "number") {
        setFormData({ ...formData, [name]: +value });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  }
  function handlePropertyChange(e) {
    const { name, value } = e.target;
    if (formData.type === "Furniture") {
      setProperties({
        ...properties,
        dimensions: { ...properties.dimensions, [name]: +value },
      });
    } else {
      setProperties({ ...properties, [name]: +value });
    }
  }
  function closeDialog() {
    setStatus({
      code: 0,
      title: "",
      message: "",
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ code: 102, title: "Loading...", message: "Please wait" });
    const rawdata = JSON.stringify({
      SKU: formData.SKU,
      name: formData.name,
      price: formData.price,
      properties: JSON.stringify(properties),
    });

    const requestOptions = {
      method: "POST",
      body: rawdata,
      redirect: "follow",
    };

    fetch(
      "https://junior-test.devbillyapps.com/backend/index.php/products/addProduct",
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => JSON.parse(res))
      .then((result) => {
        if (result.added_rows === 1) {
          setStatus({
            code: 200,
            title: "Successful",
            message: "Added 1 row, redirecting you",
          });
          history.push("/");
        }
        if (result.added_rows === -1) {
          setStatus({
            code: 400,
            title: "Failed to add Record",
            message:
              "The record with the SKU: " +
              formData.SKU +
              " might already exist",
          });
        }
        if (result.added_rows === 0) {
          setStatus({
            code: 400,
            title: "Failed to add Record",
            message: "Something went wrong please try again",
          });
        }
      })
      .catch((error) =>
        setStatus({
          code: 404,
          title: "Failed",
          message: error.message,
        })
      );
  }
  return (
    <Layout
      title="Product Add"
      actions={[{ title: "CANCEL", class: "secondaryBtn", link: "/" }]}
    >
      <form
        id="product_form"
        onSubmit={handleSubmit}
        className={styles.content}
      >
        <div className={styles.inputGroup}>
          <label>SKU</label>
          <input
            type="text"
            required
            id="sku"
            name="SKU"
            value={formData.SKU}
            onChange={handleChange}
            disabled={status.code > 0}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            required
            id="name"
            name="name"
            value={formData.name}
            disabled={status.code > 0}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            disabled={status.code > 0}
            value={formData.price}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Type Switcher</label>
          <select
            id="productType"
            name="type"
            value={formData.type}
            onChange={handleChange}
            disabled={status.code > 0}
          >
            <option value="DVD" id="DVD">
              DVD
            </option>
            <option value="Book" id="Book">
              Book
            </option>
            <option value="Furniture" id="Furntiture">
              Furniture
            </option>
          </select>
        </div>
        <DynamicForm
          type={formData.type}
          onChange={handlePropertyChange}
          properties={properties}
          disabled={status.code > 0}
        />
        <button
          type="submit"
          className={styles.primaryBtn}
          disabled={status.code > 0}
        >
          Save
        </button>
        {status.code !== 0 && (
          <div className={styles.loadingState}>
            {status.code >= 400 && (
              <button className={styles.closeBtn} onClick={closeDialog}>
                close
              </button>
            )}
            <h5>{status.title}</h5>
            <p>{status.message}</p>
          </div>
        )}
      </form>
    </Layout>
  );
}

export default AddProduct;
