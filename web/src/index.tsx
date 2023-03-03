import React from 'react';
import ReactDOM from 'react-dom/client';
import ChartComponenet from './components/chart/chart_componenet';
import './index.css';

const App = () => {
  return <main className='main_app'>
    <ChartComponenet />
  </main>;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <App />,
);
