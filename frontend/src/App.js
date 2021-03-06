import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderListScreen from './screens/OrderListScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import SearchScreen from './screens/SearchScreen';
import SearchBox from './components/SearchBox';

function App() {
  // let history = useHistory();

  const [search, setSearch] = useState('');

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  // const searchHandler = (e) => {
  //   if (window.location.href !== 'http://localhost:3000/') {
  //     window.location.replace('/');
  //   }
  //   console.log(window.location.href);
  //   setSearchTerm(e.target.value);
  // };

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // props.history.push(`/products/${search}`);
  //   // window.location.replace(`/products/${search}`);
  //   history.push(`/`);
  // };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              mygargage
              <i
                className="fas fa-warehouse"
                style={{ marginLeft: '.8rem' }}
              ></i>
            </Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Route
              render={({ history }) => (
                <SearchBox history={history} search={search} setSearch={setSearch}></SearchBox>
                // <SearchBox history={history}></SearchBox>
              )}
            ></Route>
            {/* <form onSubmit={submitHandler}>
              <i className="fa-solid fa-xmark"></i>
              <input
                type="text"
                className="topbar-input"
                placeholder="Search product..."
                onChange={(e) => setSearch(e.target.value)}
                // onChange={searchHandler}
              />
              <button type="submit">
                <i className="fas fa-search"></i>
              </button>
            </form> */}
            <Link className="black" to="/cart">
              <i className="fas fa-shopping-cart"></i>
              {cartItems.length > 0 && (
                <span className="badge black">{cartItems.length}</span>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link className="black" to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="black" to="/signin">
                Sign In
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown ">
                <Link className="black" to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="line"></div>
        </header>
        <main>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
          ></AdminRoute>
          {/* <Route path="/search" component={SearchScreen} exact></Route> */}
          {/* <Route path="/" component={HomeScreen} exact></Route> */}
          <Route
            path="/"
            render={(props) => (
              <HomeScreen {...props} search={search} setSearch={setSearch} />
            )}
            exact
          ></Route>
          <Route
            path="/products/:name?"
            render={(props) => (
              <SearchScreen {...props} search={search} setSearch={setSearch} />
            )}
            exact
          ></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
