
import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { GoogleMapContent } from "@/components/floorplan/GoogleMapContent";
import { useParams } from "react-router-dom";

const GoogleMapDetail = () => {
  const { id } = useParams();
  
  return (
    <PageLayout>
      <div className="flex-1 flex overflow-hidden">
        <GoogleMapContent mapId={id} />
      </div>
    </PageLayout>
  );
};

export default GoogleMapDetail;
