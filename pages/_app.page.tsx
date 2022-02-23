import '../styles/globals.css';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';
import MainLayoutContainer from '../components/layout/MainLayoutContainer';
import AppProviders from '../state/app/AppProviders';
import { CustomAppProps } from '../types';
import { useRouter } from 'next/router';
import { useUser } from '../state/common/hooks/use-user';

const NoopComponent = () => <></>;

function AuthenticatedApp({ Component, ...props }) {
  const {
    PageModuleStateProvider = NoopComponent,
    PageHead = Head,
    PageFooter = Footer,
    PageLayoutContainer = MainLayoutContainer,
  } = Component;

  return (
    <PageModuleStateProvider>
      <PageHead />
      <PageLayoutContainer>{props.children}</PageLayoutContainer>
      <PageFooter />
    </PageModuleStateProvider>
  );
}

function App({ Component }: CustomAppProps) {
  const { user, authenticated, loading } = useUser();
  const router = useRouter();

  if (!authenticated && loading) return <div>Loading...</div>;
  if (!user && authenticated) router.push('/login');

  return <AuthenticatedApp Component={Component} />;
}

const AppWrapper = (props) => (
  <AppProviders>
    <App {...props} />
  </AppProviders>
);

export default AppWrapper;
