"use client"
import Image from "next/image";
import Link from "next/link";
import initialProducts from "../../components/products";
import { useState } from "react";
export default function Home() {
const [products,setProducts]=useState(initialProducts);





  return (
    <div className="">
      <h1 className=" text-3xl font-bold mb-6">Simple E-commerce site</h1>
      <div className="flex">
        {initialProducts.map((product) => (
    
            <div key={product.id}>
                          <Image src={product.image} alt="Hi" width={100} height={100} />
            <h2>{product.name}</h2>

            </div>
        ))}
      </div>
    </div>
  );
}
