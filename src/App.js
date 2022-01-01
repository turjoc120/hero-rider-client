import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Components/Pages/Login/Login';
import Home from './Components/Pages/Home/Home';
import AuthProvider from './Context/AuthProvider';
import RiderRegister from './Components/Pages/Register/RiderRegister';
import LearnerRegister from './Components/Pages/Register/LearnerRegister';
import DashBoard from './Components/Pages/Dashboard/DashBoard';
import Learner from './Components/Pages/LearnerPage/Learner';
import Checkout from './Components/Pages/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>

            <Route path="/rider-signup">
              <RiderRegister></RiderRegister>
            </Route>
            <Route path="/learner-signup">
              <LearnerRegister></LearnerRegister>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/dashboard">
              <DashBoard></DashBoard>
            </Route>
            <Route path="/learner-page">
              <Learner></Learner>
            </Route>
            <Route path="/checkout/:packId">
              <Checkout></Checkout>
            </Route>
            {/* <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute> */}
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
