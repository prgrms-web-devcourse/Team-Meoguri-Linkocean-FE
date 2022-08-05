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
    setData(product);
  };

  return (
    <div>
      <button type="button" onClick={getAPI}>
        api
      </button>
      {data ? (
        <div>
          <div>id: {data.id}</div>
          <div>name: {data.name}</div>
          <div>quantity: {data.quantity}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Test;
