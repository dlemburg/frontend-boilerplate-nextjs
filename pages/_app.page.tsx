import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';
import MainLayoutContainer from '../components/layout/MainLayoutContainer';
import AppProviders from '../state/app/AppProviders';

const NoopComponent = () => <></>;

function App({ Component, pageProps, ...props }: AppProps) {
  const { PageModuleStateProvider = NoopComponent, PageHead = Head, PageFooter = Footer } = Component as any;

  return (
    <AppProviders>
      <PageModuleStateProvider>
        <PageHead {...props} />
        <MainLayoutContainer {...props}>
          <Component {...pageProps} {...props} />
        </MainLayoutContainer>
        <PageFooter {...props} />
      </PageModuleStateProvider>
    </AppProviders>
  );
}

export default App;
