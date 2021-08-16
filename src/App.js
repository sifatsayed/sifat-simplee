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


function App() {
  return (
    <div>
     <Headers></Headers>
    <Router>
      <Switch>
        <Route path="/shop">
        <Shop></Shop>
        </Route>
        <Route path="/review">
          <Review></Review>
        </Route>
        <Route path="/inventory">
          <Inventory></Inventory>
        </Route>
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
     
    </div>
  );
}

export default App;
