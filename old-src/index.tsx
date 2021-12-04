'use strict';

import ReactDOM from 'react-dom';
import { initializeThemeDetection } from './dark-mode';
import './index.css';
import Layout from './Layout';

const App = () => {
  initializeThemeDetection();

  return <Layout></Layout>;
};

ReactDOM.render(<App />, document.getElementById('app'));
