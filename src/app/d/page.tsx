import SearchProduct from "@/components/product/searchProduct";
import Stack from 'react-bootstrap/Stack';


export default function Home() {
  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      <SearchProduct/>
    </Stack>
  );
}
