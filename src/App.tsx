import "./App.css";
import Movies from "./Movies/Movies";
import { Navbar } from "./Navbar/Navbar";
import { OrderButton } from "./Order/OrderButton";

function App() {
  return (
    <div>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Navbar />
      <Movies />
    </div>
    <OrderButton />
    </div>
  );
}

export default App;
