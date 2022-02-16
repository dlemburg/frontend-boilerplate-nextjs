import React from 'react';
import { Provider } from 'urql';
import { client } from '../../util/urql-client-util';
import { ModalProvider } from '../ui/modal';
import { ToasterProvider } from '../ui/toaster';

const AppProviders = (props) => {
  return (
    <Provider value={client}>
      <ToasterProvider>
        <ModalProvider>{props.children}</ModalProvider>
      </ToasterProvider>
    </Provider>
  );
};

export default AppProviders;
