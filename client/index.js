import './index.html';
import 'dapp-styles/dapp-styles.less';

import { Router, Route, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';

import localStore from 'store';
import request from 'browser-request';
import Middlewares from './middleware';
import App from './containers/App';
import Accounts from './containers/Accounts';
import AppList from './containers/AppList';
import RPC from './containers/RPC';
import configure from './store';
import {Web3Provider} from './provider/web3-provider';
import Web3 from 'web3';
import EthcoreWeb3 from './provider/web3-ethcore-provider';

const web3 = new Web3(new Web3.providers.HttpProvider('/rpc/'));
const ethcoreWeb3 = new EthcoreWeb3(web3);
const web3Interactions = new Middlewares.WebInteractions(web3, ethcoreWeb3);
const rpcMiddleware = new Middlewares.RPC(request);
const rpcPushResponseMiddleware = new Middlewares.RPCPushResponse();
const localStorageMiddleware = new Middlewares.LocalStorage();

const storeMiddlewares = [Middlewares.logger, web3Interactions.toMiddleware(), rpcMiddleware.toMiddleware(), rpcPushResponseMiddleware.toMiddleware(), localStorageMiddleware.toMiddleware()];

const store = configure(storeMiddlewares);
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path={'/'} component={App} />
      <Route path={'/accounts'} component={Accounts} />
      <Route path={'/apps'} component={AppList} />
      <Route path={'/rpc'} component={RPC} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

new Web3Provider(web3, ethcoreWeb3, store).start();
window.store = localStore;