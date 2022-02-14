import React from 'react';
import { Provider } from 'urql';
import { client } from '../../util/urql-client-util';

const AppProviders = (props) => {
  return <Provider value={client}>{props.children}</Provider>;
};

export default AppProviders;
