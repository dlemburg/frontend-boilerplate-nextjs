const Dashboard = () => {
  return <div>Dashboard Page</div>;
};

export default Dashboard;

Dashboard.PageModuleStateProvider = (props) => {
  return <>{props.children}</>;
};
