import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Student from "./Page/Student";
import Work from "./Page/Work";
import Worktype from "./Page/Worktype";
import NotFound from "./Page/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/student" element={<Student />} />
          <Route path="/work" element={<Work />} />
          <Route path="/worktype" element={<Worktype />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
