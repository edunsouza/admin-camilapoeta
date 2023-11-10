import { useState } from 'react';
import { Button, Input } from 'antd';
import { getChanges } from '../../utils/objects';
import { useCustomers, changeDraft, updateCustomer } from '../../store/customers';
import styles from './SizingForm.module.scss';

type Field = {
  name: string;
  value?: string | null;
  setter: (value: string) => void;
}

export const SizingForm = () => {
  const customer = useCustomers(({ draft }) => draft);
  const [originalValues] = useState({ ...customer });

  const update = () => {
    const updates = getChanges(originalValues, customer);
    updateCustomer(customer.id, updates);
  };

  const toSetter = (field: string) => ((value: string) => changeDraft({ [field]: value }));
  const fields: Field[] = [
    { name: 'Braço', value: customer.arm, setter: toSetter('arm') },
    { name: 'Costas', value: customer.back, setter: toSetter('back') },
    { name: 'Busto', value: customer.bust, setter: toSetter('bust') },
    { name: 'Cintura', value: customer.waist, setter: toSetter('waist') },
    { name: 'Quadril', value: customer.hip, setter: toSetter('hip') },
    { name: 'Decote', value: customer.cleavage, setter: toSetter('cleavage') },
    { name: 'Manga', value: customer.sleeve, setter: toSetter('sleeve') },
    { name: 'Gancho', value: customer.crotch, setter: toSetter('crotch') },
    { name: 'Altura busto', value: customer.bustHeight, setter: toSetter('bustHeight') },
    { name: 'Comprimento corpo', value: customer.bodyLength, setter: toSetter('bodyLength') },
    { name: 'Comprimento saia', value: customer.skirtLength, setter: toSetter('skirtLength') },
    { name: 'Comprimento calça', value: customer.pantsLength, setter: toSetter('pantsLength') },
  ];

  return (
    <form className={styles.form} onSubmit={e => e.preventDefault()}>
      {
        fields.map(({ name, value, setter }) => (
          <Input
            key={name}
            addonBefore={name}
            value={value || ''}
            onChange={({ target }) => setter(target.value)}
            placeholder="0cm"
          />
        ))
      }

      <Button onClick={update} size="large" type="primary" shape="round">
        Atualizar medida
      </Button>
    </form>
  );
};
