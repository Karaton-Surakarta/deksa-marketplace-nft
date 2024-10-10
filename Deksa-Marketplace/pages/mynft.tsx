import React from "react";
import MyNFT from "../components/NFTCard/MyNFT";
import Navbar from "../components/Navbar/Navbar";

function mynft() {
  return (
    <main>
      <Navbar />
      <div className="container my-8">
        <MyNFT />
      </div>
    </main>
  );
}

export default mynft;
