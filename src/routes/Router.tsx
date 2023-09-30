import { Route, Switch } from 'wouter';
import { routes } from '.';
import { SizingPage } from './pages/Sizing';
import { CustomersPage } from './pages/Customers';
import { CustomerDetailsPage } from './pages/CustomerDetails';

export const Router = () => {
  return (
    <Switch>
      <Route path={routes.customers} component={CustomersPage} />
      <Route path={routes.addCustomer} component={CustomerDetailsPage} />
      <Route path={routes.customerDetails} component={CustomerDetailsPage} />
      <Route path={routes.sizing} component={SizingPage} />
      <Route component={CustomersPage} />
    </Switch>
  );
};