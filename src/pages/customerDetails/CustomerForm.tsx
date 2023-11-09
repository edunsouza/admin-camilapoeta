import { Button, Input } from 'antd';
import { validateCustomer } from '../../utils/validations';
import { useCustomers, changeDraft, updateCustomer, setDraftError } from '../../store/customers';
import styles from './CustomerForm.module.scss';

export const CustomerForm = () => {
  const [customer, loading] = useCustomers(({ draft, draftLoading }) => [draft, draftLoading]);

  const update = () => {
    const validationError = validateCustomer(customer);
    if (validationError) {
      return setDraftError(validationError);
    }

    updateCustomer(customer.id, {
      name: customer.name?.trim(),
      email: customer.email?.trim(),
      phone: customer.phone?.trim()
    });
  };

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      <Input
        addonBefore="Nome"
        value={customer?.name || ''}
        onChange={({ target }) => changeDraft({ name: target.value })}
        placeholder="Cliente"
      />
      <Input
        addonBefore="Email"
        value={customer?.email || ''}
        onChange={({ target }) => changeDraft({ email: target.value })}
        placeholder="exemplo@gmail.com"
      />
      <Input
        addonBefore="Fone"
        value={customer?.phone || ''}
        onChange={({ target }) => changeDraft({ phone: target.value })}
        placeholder="00 1234 5678"
      />

      <Button
        onClick={update}
        size="large"
        type="primary"
        shape="round"
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Atualizar cliente'}
      </Button>
    </form>
  );
};
