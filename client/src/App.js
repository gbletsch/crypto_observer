import { Header } from './components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'
// import { Register } from './components/Register'
import { Dashboard } from './components/Dashboard'
import BalanceContextProvider from './context/BalanceContext'
import CropsContextProvider from './context/CropsContext'

import './App.css';

import UserContextProvider from './context/UserContext'

function App() {

  return (
    <BrowserRouter>
      <UserContextProvider>
        <BalanceContextProvider>
          <CropsContextProvider>

            <div className="container">
              <Header />
              <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route path='/login' component={Login} />
                {/*<Route path='/register' component={Register} />*/}
              </Switch>
            </div>
          </CropsContextProvider>
        </BalanceContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
