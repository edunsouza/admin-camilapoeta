import { Route, Switch } from 'wouter';
import { routes } from '.';
import { CustomersPage } from './pages/Customers';
import { CustomerDetailsPage } from './pages/CustomerDetails';

export const Router = () => {
  return (
    <Switch>
      <Route path={routes.customers} component={CustomersPage} />
      <Route path={routes.addCustomer} component={CustomerDetailsPage} />
      <Route path={routes.customerDetails} component={CustomerDetailsPage} />
      <Route component={CustomersPage} />
    </Switch>
  );
};