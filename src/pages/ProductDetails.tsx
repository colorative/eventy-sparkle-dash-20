
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { ProductDetailsContent } from "@/components/products/ProductDetailsContent";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <PageLayout hideRightSidebar>
      <ProductDetailsContent id={id} />
    </PageLayout>
  );
};

export default ProductDetails;
