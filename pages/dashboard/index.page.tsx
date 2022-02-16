const Dashboard = () => {
  return (
    <div>
      {process.env.NEXT_PUBLIC_GRAPHQL_URL}
      Dashboard Page
    </div>
  );
};

export default Dashboard;

Dashboard.PageModuleStateProvider = (props) => {
  return <>{props.children}</>;
};
