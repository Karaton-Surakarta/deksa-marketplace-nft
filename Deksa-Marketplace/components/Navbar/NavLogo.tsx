import React from "react";
import Image from "next/image";
import Link from "next/link";

function NavLogo() {
  return (
    <Link href="/">
      <div className="flex space-x-2 cursor-pointer ml-6 mt-4">
        {/* <Image width={120} height={30} src="/logo-white.png" alt="logo" /> */}
        <Image src='/images/masaLogo.png' width={50} height={30} alt="logo"/>
      </div>
    </Link>
  );
}

export default NavLogo;
