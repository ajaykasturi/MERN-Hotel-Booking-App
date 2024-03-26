import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Home Page</p>
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/signin"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
