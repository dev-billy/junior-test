import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";

const routes = [
  {
    path: "/",
    exact: true,
    component: ProductList,
  },
  {
    path: "/addproduct",
    exact: true,
    component: AddProduct,
  },
];

export default routes;
