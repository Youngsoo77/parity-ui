
import Web3 from 'web3';
import request from 'browser-request';

const web3 = new Web3(new Web3.providers.HttpProvider('/rpc/'));
const ethcoreWeb3 = new EthcoreWeb3(web3);

import EthcoreWeb3 from '../provider/web3-ethcore-provider';

// Middleware classes
import logger from './logger';
import WebInteractions from './user-web3-interactions';
import Rpc from './rpc';
import LocalStorage from './localstorage';
import Toastr from './toastr.js';

// Middleware Instances
const web3Interactions = new WebInteractions(web3, ethcoreWeb3);
const rpc = new Rpc(request);
const localstorage = new LocalStorage();
const toastr = new Toastr();

export default [
  logger,
  web3Interactions.toMiddleware(),
  rpc.toMiddleware(),
  localstorage.toMiddleware(),
  toastr.toMiddleware()
];
