import SearchProduct from "@/components/searchProduct";
import Image from "next/image";


export default function Home() {
  return (
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <SearchProduct/>
      </div>
  );
}
