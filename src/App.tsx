import { ConfigProvider } from 'antd';
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import TheAuth from "./views/TheAuth";
// import TheSignin from "./pages/auth/TheSignin";
// import TheRegister from "./pages/auth/TheRegister";
// import TheLandingPage from "./views/TheLandingPage";
// import TheHome from "./pages/TheHome";
// import TheProductDetail from "./pages/TheCheckout";
// import TheCheckout from "./pages/TheCheckout";
// import TheShoppingCart from "./pages/TheShoppingCart";
// import TheProductsList from "./pages/TheProductsList";
import { ListContextProvider } from "@/stores";
import TheLanding from "@/pages/TheLanding";
import TheAuth from '@/pages/TheAuth';
import TheSignin from '@/pages/TheAuth/TheSignin';
import TheSignup from '@/pages/TheAuth/TheSignup';
function App() {
  const [count, setCount] = useState(0);
  return (
        <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6b89ca',
          controlHeight: 40,
          borderRadius: 4
        },
      }}
    >
      <ListContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<TheLanding />}>
            </Route>
            {/* <Route path="/" element={<TheLandingPage />}>
              <Route path="/" element={<TheHome />}></Route>
              <Route
                path="/products-list"
                element={<TheProductsList />}
              ></Route>
              <Route
                path="/product-detail"
                element={<TheProductDetail />}
              ></Route>
              <Route path="/checkout" element={<TheCheckout />}></Route>
              <Route
                path="/shopping-cart"
                element={<TheShoppingCart />}
              ></Route>
            </Route> */}
            <Route path="/auth" element={<TheAuth />}>
              <Route path="/auth/signin" element={<TheSignin />}></Route>
              <Route path="/auth/signup" element={<TheSignup />}></Route>
            </Route>
          </Routes>
        </Router>
      </ListContextProvider>
    </ConfigProvider>
  );
}
export default App;
