import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import pages from './pages';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <Route path="/" component={pages.Landing} exact />
          <Route path="/dashboard" component={pages.Dashboard} />
          <Route path="/login" component={pages.Login} />
          <Route path="/chat/:id" component={pages.Chat} />
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
