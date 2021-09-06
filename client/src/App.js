import { Header } from './components/Header'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Dashboard } from './components/Dashboard'

import './App.css';
import UserContext from './context/User'
import { useEffect, useState } from 'react'
import client from './axios'

function App() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    client.get('user')
      .then(response => {
        setEmail(response.data.user.email)
      })
      .catch(error => console.log(error))
  }, [])

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      <BrowserRouter>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
