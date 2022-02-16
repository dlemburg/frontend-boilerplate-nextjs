import React from 'react';
import { Provider } from 'urql';
import { client } from '../../util/urql-client-util';
import { ModalProvider } from '../ui/modal';

const AppProviders = (props) => {
  return (
    <Provider value={client}>
      <ModalProvider>{props.children}</ModalProvider>
    </Provider>
  );
};

export default AppProviders;
