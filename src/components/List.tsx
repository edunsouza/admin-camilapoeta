import { List as BaseList } from 'antd';
import { SpinnerIcon } from '../icons';

export interface ListProps<T> {
  data: T[];
  pageSize: number | string;
  total?: number | string;
  currentPage?: number | string;
  loading?: boolean;
  renderItem: (item: T) => React.ReactNode;
  onChange: (page: number, size: number) => void;
}

export const List = <T extends object>({
  data,
  pageSize,
  total,
  currentPage,
  loading,
  renderItem,
  onChange,
}: ListProps<T>) => {
  return (
    <BaseList
      grid={{ gutter: 10, xs: 1, column: 2 }}
      dataSource={data}
      pagination={{
        pageSize: Number(pageSize),
        current: Number(currentPage) || 1,
        total: Number(total) || data.length,
        onChange: (page, size) => {
          onChange(page, size);
          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
        },
        showQuickJumper: false,
        showSizeChanger: false,
        align: 'center',
        position: 'bottom',
      }}
      renderItem={(item) => (
        <BaseList.Item>
          {renderItem(item)}
        </BaseList.Item>
      )}
      loading={{
        indicator: <SpinnerIcon />,
        spinning: loading,
        tip: 'Carregando...',
        style: { color: 'gray' }
      }}
      locale={{ emptyText: 'Nenhum resultado' }}
    />
  );
};