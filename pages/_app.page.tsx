import '../styles/globals.css';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';
import MainLayoutContainer from '../components/layout/MainLayoutContainer';
import AppProviders from '../state/app/AppProviders';
import { CustomAppProps } from '../types';

const NoopComponent = () => <></>;

function App({ Component }: CustomAppProps) {
  const {
    PageModuleStateProvider = NoopComponent,
    PageHead = Head,
    PageFooter = Footer,
    PageLayoutContainer = MainLayoutContainer,
  } = Component;

  return (
    <AppProviders>
      <PageModuleStateProvider>
        <PageHead />
        <PageLayoutContainer>
          <Component />
        </PageLayoutContainer>
        <PageFooter />
      </PageModuleStateProvider>
    </AppProviders>
  );
}

export default App;
