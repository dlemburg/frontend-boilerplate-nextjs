import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from '../../components/common/Table';
import { useModal } from '../../state/ui/modal';
import { useToaster } from '../../state/ui/toaster';

const COLUMNS = [
  { label: 'name', getValue: (x) => x.name },
  { label: 'id', getValue: (x) => `${x.id}` },
];

const DATA = [
  { name: 'name', id: 1 },
  { name: 'name', id: 2 },
];

const Dashboard = () => {
  const [{ isOpen: isModalOpen }, { openModal }] = useModal();
  const [{ isOpen: isToasterOpen }, { openToaster }] = useToaster();
  const router = useRouter();

  useEffect(() => {
    if (!isModalOpen) {
      openModal({
        body: <div style={{ height: 300, width: 300 }}>hello world</div>,
      });
    }

    if (!isToasterOpen) {
      openToaster({ body: 'Hello World!' });
    }
  }, []);

  return (
    <div>
      Example Page
      <div>
        Table Example
        <Table columns={COLUMNS} data={DATA} />
      </div>
      <div>{router.locale}</div>
      {process.env.NEXT_PUBLIC_GRAPHQL_URL}
    </div>
  );
};

export default Dashboard;

Dashboard.PageModuleStateProvider = (props) => {
  return <>{props.children}</>;
};
