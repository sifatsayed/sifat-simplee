import './App.css';
import Headers from './Components/Headers/Headers';
import Shop from './Components/Shop/Shop';
import Review from './Review/Review';
import Inventory from './Inventory/Inventory';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NotFound from './Components/NotFound/NotFound';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Login from './Components/Login/Login';
import Shipment from './Components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext()

function App() {
  const [loggedInUser , setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value ={[loggedInUser , setLoggedInUser]}>
      <h4>Email : {loggedInUser.email}</h4>
    <Router>
    <Headers></Headers>
      <Switch>
        <Route path="/shop">
        <Shop></Shop>
        </Route>
        <Route path="/review">
          <Review></Review>
        </Route>
        <PrivateRoute path="/inventory">
          <Inventory></Inventory>
        </PrivateRoute>
        <Route path="/login">
          <Login></Login>
        </Route>
        <PrivateRoute path="/shipment">
          <Shipment></Shipment>
        </PrivateRoute>
        <Route exact path="/">
          <Shop></Shop>
        </Route>
        <Route path="/product/:productKey"> 
          <ProductDetail></ProductDetail>
        </Route>
        <Route path="*">
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>
     
    </UserContext.Provider>
  );
}

export default App;
