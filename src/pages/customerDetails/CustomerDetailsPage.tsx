import { PropsWithChildren, useEffect, useState } from 'react';
import { Alert, AlertProps, Tabs } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { parseRoute } from '../../routes';
import { setAppTitle } from '../../store/settings';
import { useCustomers, fetchCustomerDetails, resetDraft, setDraftError } from '../../store/customers';
import { LoaderOverlay, PageBody } from '../../components';
import { SizingForm } from './SizingForm';
import { CustomerForm } from './CustomerForm';
import styles from './CustomerDetailsPage.module.scss';

const INFO_TAB = 'customer_info';
const SIZING_TAB = 'customer_sizing';

export const CustomerDetailsPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(INFO_TAB);
  const [draft, loading, error, touched] = useCustomers(s => [
    s.draft,
    s.draftLoading,
    s.draftError,
    s.draftTouched
  ]);

  useEffect(() => {
    if (params.id) {
      fetchCustomerDetails(params.id);
    }

    return () => resetDraft();
  }, [params.id]);

  useEffect(() => {
    if (!loading && draft.name && params.id === draft.id) {
      setAppTitle(draft.name);
    }
  }, [loading, draft, params.id]);

  useEffect(() => {
    // TODO: improve error handling logic
    if (error?.toLowerCase() === 'cliente não encontrado') {
      setDraftError(null);
      navigate(parseRoute('customers'), {});
    }
  }, [error, navigate]);

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
              <TabWrapper touched={touched} loading={loading} error={error}>
                <CustomerForm />
              </TabWrapper>
            )
          },
          {
            key: SIZING_TAB,
            label: 'Medidas',
            children: (
              <TabWrapper touched={touched} loading={loading} error={error}>
                <SizingForm />
              </TabWrapper>
            )
          }
        ]}
      />
    </PageBody>
  );
};

const TabWrapper = ({ touched, loading, error, children }: PropsWithChildren<{
  touched: boolean;
  loading: boolean;
  error: string | null
}>) => {
  let type: AlertProps['type'] = touched ? 'warning' : 'info';
  let message = touched ? 'Alterações não salvas!' : 'Sem alterações';

  if (error) {
    type = 'error';
    message = error;
  }

  return (
    <>
      {loading && <LoaderOverlay />}
      <Alert message={message} type={type} className={styles.formStatus} />
      {children}
    </>
  );
};
