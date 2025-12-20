import { Route, Routes} from "react-router-dom";
import Homepage from "./pages/HomePage";

function App() {
  return (
      <>
        <Routes>
            <Route index="/" element={<Homepage />}>

            </Route>

            <Route >

            </Route>
        </Routes>
      </>
  );
}

export default App;
