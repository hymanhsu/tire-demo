import { redirect } from 'next/navigation'


export default function Home() {
  redirect("/m/dashboard");
  return (
    <></>
  );
}
