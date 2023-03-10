import React from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Products/Product/Product";
import { dataURL } from "../config";
import { fetchData } from "../services/fetchData";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/Extras/LoadingSpinner";

const ProductView = () => {
  const params = useParams();
  const { data: product, status } = useQuery("products", () =>
    fetchData(`${dataURL}/${params.productID}`)
  );

  return (
    <>
      {status === "loading" && <LoadingSpinner />}
      {status === "success" && (
        <Product
          productId={product.id}
          imgLink={product.image}
          productName={product.title}
          price={product.price}
        />
      )}
    </>
  );
};

export default ProductView;
