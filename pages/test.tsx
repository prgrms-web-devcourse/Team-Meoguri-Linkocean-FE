import axios from "axios";
import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  quantity: number;
}
const Test = () => {
  const [data, setData] = useState<Product>();
  const getAPI = async () => {
    const res = await axios.get("http://localhost:3000/products/22");
    const product = res.data as Product;
    console.log(product);
    setData(product);
  };

  return (
    <div>
      <button type="button" onClick={getAPI}>
        api
      </button>
    </div>
  );
};

export default Test;
