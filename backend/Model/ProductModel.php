<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";

class ProductModel extends Database
{
    public function getProducts()
    {
        return $this->select("SELECT * FROM products ORDER BY SKU");
    }
    public function setProducts($params)
    {
        return $this->insert(
            "INSERT INTO products (SKU, name, price, properties ) VALUES (?,?,?,?)",
            [
                "type" => "ssis",
                "SKU" => $params["SKU"],
                "name" => $params["name"],
                "price" => $params["price"],
                "properties" => $params["properties"],
            ]
        );
    }
    public function deleteProduct($params)
    {
        return $this->delete("DELETE FROM products where SKU = ?", [
            "type" => "s",
            "SKU" => $params["SKU"],
        ]);
    }
}
?>
