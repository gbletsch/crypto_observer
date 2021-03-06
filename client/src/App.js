import { Header } from "./components/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";
// import { Register } from './components/Register'
import { Dashboard } from "./components/Dashboard";
import BalanceContextProvider from "./context/BalanceContext";
import CropsContextProvider from "./context/CropsContext";

import "./App.css";

import UserContextProvider from "./context/UserContext";
import Crops from "./components/Crops";
import BalancePage from "./components/BalancePage";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <BalanceContextProvider>
          <CropsContextProvider>
            <div className="container">
              <Header />
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route path="/login" component={Login} />
                {/*<Route path='/register' component={Register} />*/}
                <Route path="/crops" component={Crops} />
                <Route path="/balance" component={BalancePage} />
              </Switch>
            </div>
          </CropsContextProvider>
        </BalanceContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
