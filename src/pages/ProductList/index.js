import { useState, useEffect } from "react";
import Card from "../../components/Card";
import Layout from "../../layout";
import * as styles from "./productlist.module.scss";
import { useHistory } from "react-router-dom";

function ProductList() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteItems, setDeleteItems] = useState([]);
  function handleChange(e) {
    const { name, checked } = e.target;
    if (checked) {
      setDeleteItems([...deleteItems, { SKU: name }]);
    } else {
      let newItems = deleteItems.filter((item) => item.SKU !== name);
      setDeleteItems([...newItems]);
    }
  }
  function handleDelete() {
    setLoading(true);
    deleteItems.forEach((item) => {
      const rawdata = JSON.stringify({ SKU: item.SKU });
      console.log(rawdata);
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Access-Control-Allow-Origin", "*");
      const requestOptions = {
        method: "DELETE",
        body: rawdata,
        headers: headers,
        redirect: "follow",
      };

      fetch(
        "http://junior-test.devbillyapps.com/backend/index.php/products/deleteProduct",
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => history.go(0))
        .catch((error) => console.log("error", error));
    });
  }
  useEffect(() => {
    fetch("http://junior-test.devbillyapps.com/backend/index.php/products/list")
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <Layout
      title="Product List"
      actions={[
        { title: "ADD", link: "/addProduct", class: "primaryBtn" },
        {
          title: `MASS DELETE`,
          class: "secondaryBtn",
          id: "delete-product-btn",
          onclick: handleDelete,
        },
      ]}
    >
      {loading && (
        <h3 style={{ margin: "5px 1em", color: "green" }}>loading...</h3>
      )}
      <div className={styles.content}>
        {data.map((item, index) => (
          <Card
            SKU={item.SKU}
            name={item.name}
            price={item.price}
            key={index}
            properties={item.properties}
            onChange={handleChange}
            items={deleteItems}
          />
        ))}
      </div>
    </Layout>
  );
}

export default ProductList;
