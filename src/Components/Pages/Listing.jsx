import ListingPage from "../ListingPage";

export default function Listing() {
  return (
    <div className="w-screen h-screen flex flex-row">
      <ListingPage></ListingPage>
      <div className="w-4/6 h-screen">hello</div>
    </div>
  );
}