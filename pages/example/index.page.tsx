import { useEffect } from 'react';
import { useModal } from '../../state/ui/modal';

const Dashboard = () => {
  const [, { openModal }] = useModal();

  useEffect(() => {
    openModal({
      body: <div style={{ height: 300, width: 300 }}>hello world</div>,
    });
  }, []);

  return (
    <div>
      {process.env.NEXT_PUBLIC_GRAPHQL_URL}
      Example Page
    </div>
  );
};

export default Dashboard;

Dashboard.PageModuleStateProvider = (props) => {
  return <>{props.children}</>;
};
