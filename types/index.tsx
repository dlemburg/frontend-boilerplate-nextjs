import type { AppProps } from 'next/app';
import { FC } from 'react';

type AppComponentExtensions = {
  PageModuleStateProvider: FC;
  PageHead: FC;
  PageFooter: FC;
  PageLayoutContainer: FC;
};

export interface CustomAppProps extends Omit<AppProps, 'Component'> {
  Component: AppProps['Component'] & AppComponentExtensions;
}
