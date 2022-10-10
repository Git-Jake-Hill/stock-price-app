import AutoComplete from "../components/AutoComplete";
// import { AutoComplete } from "../components/AutoComplete.jsx";
import StockList from "../components/StockList";

function StockOverviewPage() {
  return (
    <div>
      Stock Overview Page
      <AutoComplete />
      <StockList />
    </div>
  );
}

export default StockOverviewPage;
