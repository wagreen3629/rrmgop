import Shop from "../components/Shop";
import usePageTitle from "../hooks/usePageTitle";

export default function ShopPage() {
  usePageTitle("Shop");

  return (
    <div className="pt-20">
      <Shop />
    </div>
  );
}
