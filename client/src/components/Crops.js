import React from "react";
import { AddCrops } from "./AddCrops";
import { CropsList } from "./CropsList";

function Crops() {
  return (
    <div>
      <AddCrops />
      <CropsList />
    </div>
  );
}

export default Crops;
