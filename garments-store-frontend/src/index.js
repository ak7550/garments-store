import React from 'react';
import ReactDom from 'react-dom';
import { Routes } from './Routes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDom.render(<Routes />,
  document.getElementById('root')
);
serviceWorkerRegistration.register();

