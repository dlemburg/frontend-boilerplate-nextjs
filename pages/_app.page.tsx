import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';
import LayoutContainer from '../components/layout/LayoutContainer';
import AppProviders from '../state/providers/AppProviders';

const NoopComponent = () => <></>;

function App({ Component, pageProps, ...props }: AppProps) {
  const { PageModuleStateProvider = NoopComponent, PageHead = Head, PageFooter = Footer } = Component as any;

  return (
    <AppProviders>
      <PageModuleStateProvider>
        <PageHead {...props} />
        <LayoutContainer {...props}>
          <Component {...pageProps} {...props} />
        </LayoutContainer>
        <PageFooter {...props} />
      </PageModuleStateProvider>
    </AppProviders>
  );
}

export default App;
