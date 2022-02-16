import { useEffect } from 'react';
import Table from '../../components/common/Table';
import { useModal } from '../../state/ui/modal';

const COLUMNS = [
  { label: 'name', getValue: (x) => x.name },
  { label: 'id', getValue: (x) => `${x.id}` },
];

const DATA = [
  { name: 'name', id: 1 },
  { name: 'name', id: 2 },
];

const Dashboard = () => {
  const [{ isOpen }, { openModal }] = useModal();

  useEffect(() => {
    if (isOpen) return;

    openModal({
      body: <div style={{ height: 300, width: 300 }}>hello world</div>,
    });
  }, []);

  return (
    <div>
      <Table columns={COLUMNS} data={DATA} />
      {process.env.NEXT_PUBLIC_GRAPHQL_URL}
      Example Page
    </div>
  );
};

export default Dashboard;

Dashboard.PageModuleStateProvider = (props) => {
  return <>{props.children}</>;
};
