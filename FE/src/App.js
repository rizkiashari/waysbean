import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useContext, useEffect } from "react";
import { API, setAuthToken } from "./config/API";
import { UserContext } from "./contexts/UserContext";
import PrivateRoute from "./route/PrivateRoute";
import Header from "./component/Header";
import Home from "./pages/Home";
import Owner from "./pages/Owner";
import Profile from "./component/Profile";
import AddProduct from "./component/AddProduct";
import DetailProduct from "./component/DetailProduct";
import Cart from "./component/Cart";
import Shipping from "./component/Shipping";
import ProductAdmin from "./component/ProductAdmin";
import EditProduct from "./component/EditProduct";

if (localStorage.getItem("token")) {
  setAuthToken(localStorage.getItem("token"));
}

const App = () => {
  const { dispatch } = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status !== 200) {
        return dispatch({ type: "AUTH_ERROR" });
      }
      let payload = response.data.data;
      payload.token = localStorage.getItem("token");
      dispatch({
        type: "AUTH_SUCCESS" || "AUTH_REGISTER",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const client = new QueryClient();

  return (
    <Router>
      <QueryClientProvider client={client}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/dashboard' component={Owner} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/add-product' component={AddProduct} />
          <PrivateRoute exact path='/product/:id' component={DetailProduct} />
          <PrivateRoute exact path='/transaction' component={Cart} />
          <PrivateRoute exact path='/shipping' component={Shipping} />
          <PrivateRoute
            exact
            path='/product/edit/:id'
            component={EditProduct}
          />
          <PrivateRoute
            exact
            path='/dashboard/product'
            component={ProductAdmin}
          />
        </Switch>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
