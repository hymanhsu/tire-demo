import SearchProduct from "@/components/product/searchProduct";
import Stack from "react-bootstrap/Stack";
import CookieConsentBar from "@/components/cookieConsent";
import { cookies } from "next/headers";


export default function Home() {
  const cookieConsent = cookies().has("cookieConsent");

  return (
    <>
      <Stack gap={2} className="col-md-15 mx-auto">
        <SearchProduct />
        <CookieConsentBar cookieConsent={cookieConsent} />
      </Stack>
    </>
  );
}
