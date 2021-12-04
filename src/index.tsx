'use strict';

import ReactDOM from 'react-dom';
import { initializeThemeDetection } from './dark-mode';
import './main.scss';
import Layout from './Layout';

const App = () => {
  initializeThemeDetection();

  return <Layout></Layout>;
};

ReactDOM.render(<App />, document.getElementById('app'));
