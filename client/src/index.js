import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Toaster } from 'react-hot-toast';

ReactDOM.render(<>
    <Routes />
    <Toaster />
</>, document.getElementById('root'));
