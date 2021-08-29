<?php
class ProductController extends BaseController
{
    public function list()
    {
        $strErrorDesc = "";
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == "GET") {
            try {
                $productModel = new ProductModel();
                $arrProducts = $productModel->getProducts();
                $responseData = json_encode($arrProducts);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . "Something Went Wrong";
                $strErrorHeader = "HTTP/1.1 500 Internal Server Error";
            }
        } else {
            $strErrorDesc = "Method not yet Supported";
            $strErrorHeader = "HTTP/1.1 422 Unprocessable Entity";
        }

        if (!$strErrorDesc) {
            $this->sendOutput($responseData, [
                "Content-Type: application/json",
                "HTTP/1.1 200 OK",
            ]);
        } else {
            $this->sendOutput(json_encode(["error" => $strErrorDesc]), [
                "Content-Type: application/json",
                $strErrorHeader,
            ]);
        }
    }
    public function addProduct()
    {
        $strErrorDesc = "";
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == "POST") {
            try {
                $productModel = new ProductModel();
                $input = (array) json_decode(file_get_contents("php://input"));
                $addedStatus = $productModel->setProducts($input);
                $responseData = json_encode($addedStatus);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . "Something Went Wrong";
                $strErrorHeader = "HTTP/1.1 500 Internal Server Error";
            }
        } else {
            $strErrorDesc = "Method not Supported";
            $strErrorHeader = "HTTP/1.1 422 Unprocessable Entity";
        }

        if (!$strErrorDesc) {
            $this->sendOutput($responseData, [
                "Content-Type: application/json",
                "HTTP/1.1 200 OK",
            ]);
        } else {
            $this->sendOutput(json_encode(["error" => $strErrorDesc]), [
                "Content-Type: application/json",
                $strErrorHeader,
            ]);
        }
    }
    public function deleteProduct()
    {
        $strErrorDesc = "";
        $requestMethod = $_SERVER["REQUEST_METHOD"];

        if (strtoupper($requestMethod) == "DELETE") {
            try {
                $productModel = new ProductModel();
                $input = (array) json_decode(file_get_contents("php://input"));
                $status = $productModel->deleteProduct($input);
                $responseData = json_encode($status);
            } catch (Error $e) {
                $strErrorDesc = $e->getMessage() . "Something Went Wrong";
                $strErrorHeader = "HTTP/1.1 500 Internal Server Error";
            }
        } else {
            $strErrorDesc = "Method not Supported";
            $strErrorHeader = "HTTP/1.1 422 Unprocessable Entity";
        }

        if (!$strErrorDesc) {
            $this->sendOutput($responseData, [
                "Content-Type: application/json",
                "HTTP/1.1 200 OK",
            ]);
        } else {
            $this->sendOutput(json_encode(["error" => $strErrorDesc]), [
                "Content-Type: application/json",
                $strErrorHeader,
            ]);
        }
    }
}

?>
