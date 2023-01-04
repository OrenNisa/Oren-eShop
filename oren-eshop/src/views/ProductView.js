import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

const ProductView = () => {
  const params = useParams();
  const { data, loading, error } = useFetch(
    `https://fakestoreapi.com/products/${params.productID}`
  );
  console.log(data);
  return data && <div>{data.id}</div>;
};

export default ProductView;
