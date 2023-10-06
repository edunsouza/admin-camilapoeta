import { PropsWithChildren, useEffect, useState } from 'react';
import { useRoute } from 'wouter';
import { Alert, Tabs } from 'antd';
import { routes, RouteParams } from '..';
import { setAppTitle } from '../../store/settings';
import { useCustomers, fetchCustomerDetails, setDraftCustomer } from '../../store/customers';
import { PageBody } from '../../components';
import { SizingForm } from '../views/SizingForm';
import { CustomerForm } from '../views/CustomerForm';
import styles from './CustomerDetails.module.scss';
import { SpinnerIcon } from '../../icons';

const INFO_TAB = 'customer_info';
const SIZING_TAB = 'customer_sizing';

export const CustomerDetailsPage = () => {
  const [, params] = useRoute<RouteParams['CustomerDetails']>(routes.customerDetails);
  const [activeTab, setActiveTab] = useState(INFO_TAB);
  const { draftCustomer, loading, draftSaved } = useCustomers();

  useEffect(() => {
    if (!params?.id) {
      return;
    }

    if (params.id === 'novo') {
      setDraftCustomer({ id: '', name: '', email: '', phone: '', sizing: {} });
      setActiveTab(INFO_TAB);
      setAppTitle('Novo cliente');
      return;
    }

    fetchCustomerDetails(params.id);
  }, [params?.id]);

  useEffect(() => {
    if (!loading && draftCustomer?.name) {
      setAppTitle(draftCustomer.name);
    }
  }, [loading, draftCustomer]);

  return (
    <PageBody>
      <Tabs
        activeKey={activeTab}
        onChange={tab => setActiveTab(tab)}
        size='large'
        animated
        items={[
          {
            key: INFO_TAB,
            label: 'Informações',
            children: (
              <TabWrapper touched={!draftSaved} loading={loading}>
                <CustomerForm />
              </TabWrapper>
            )
          },
          {
            key: SIZING_TAB,
            label: 'Medidas',
            children: (
              <TabWrapper touched={!draftSaved} loading={loading}>
                <SizingForm />
              </TabWrapper>
            )
          }
        ]}
      />
    </PageBody>
  );
};

const TabWrapper = ({ touched, loading, children }: PropsWithChildren<{ touched: boolean; loading: boolean }>) => {
  const type = touched ? 'warning' : 'info';
  const message = touched ? 'Alterações não salvas!' : 'Sem alterações';

  if (loading) {
    return (<SpinnerIcon />);
  }

  return (
    <>
      <Alert message={message} type={type} className={styles.formStatus} />
      {children}
    </>
  );
};
