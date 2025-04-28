import { Box, Paper, Table } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: "electronics" | "fashion" | "home" | "books" | "others";
  stock: number;
}
const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 130 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "price", headerName: "Price", type: "number", width: 100 },
    { field: "category", headerName: "Category", width: 130 },
    { field: "stock", headerName: "Stock", type: "number", width: 90 },
  ];

  const rows = products.map((product: Product) => ({
    id: product._id,
    ...product,
  }));

  const paginationModel = { page: 0, pageSize: 5 };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_URL_API}/api/products`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  return (
    <Card>
      <CardContent>
        <Paper variant="outlined">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};

export default HomePage;
