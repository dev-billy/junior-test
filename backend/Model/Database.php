<?php

class Database
{
    protected $connection = null;

    public function __construct()
    {
        try {
            $this->connection = new mysqli(
                DB_HOST,
                DB_USERNAME,
                DB_PASSWORD,
                DB_DATABASE_NAME
            );
            if (mysqli_connect_errno()) {
                throw new Exception("Could not connect to database.");
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    public function select($query = "")
    {
        try {
            $stmt = $this->executeStatement("select", $query);
            $result = $stmt->get_result()->fetch_all(MYSQLI_ASSOC);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
        return false;
    }

    public function insert($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement("insert", $query, $params);
            $result = json_encode(["added_rows" => $stmt->affected_rows]);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }

    public function delete($query = "", $params = [])
    {
        try {
            $stmt = $this->executeStatement("delete", $query, $params);
            $result = json_encode(["affected_rows" => $stmt->affected_rows]);
            $stmt->close();
            return $result;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
    private function executeStatement($type, $query = "", $params = [])
    {
        try {
            $stmt = $this->connection->prepare($query);
            if ($stmt === false) {
                throw new Exception(
                    "Unable to do prepared statement " . $query
                );
            }
            if ($type == "insert") {
                $stmt->bind_param(
                    $params["type"],
                    $params["SKU"],
                    $params["name"],
                    $params["price"],
                    $params["properties"]
                );
            }
            if ($type == "delete") {
                $stmt->bind_param($params["type"], $params["SKU"]);
            }
            $stmt->execute();

            return $stmt;
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}

?>
