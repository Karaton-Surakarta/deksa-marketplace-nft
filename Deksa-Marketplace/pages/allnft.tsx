import React from "react";
import AllNFT from "../components/NFTCard/AllNFT";
import Navbar from "../components/Navbar/Navbar";

function allnft() {
  return (
    <main>
      <Navbar />
      <div className="container my-8">
        <AllNFT />
      </div>
    </main>
  );
}

export default allnft;
