import React from 'react';

import styles from './Account.css';

import Web3Component from '../Web3Component';
import Identicon from '../Identicon';

export default class Account extends Web3Component {
  // IE9 - contextTypes are not inherited
  static contextTypes = Web3Component.contextTypes;

  state = {
    balance: null
  };

  componentDidMount () {
    this.fetchBalance(this.props.address);
  }

  componentWillReceiveProps (newProps) {
    this.fetchBalance(newProps.address);
  }

  fetchBalance (address) {
    this.context.web3.eth.getBalance(address, (err, balance) => {
      if (err) {
        return;
      }

      this.setState({
        balance
      });
    });
  }

  render () {
    const acc = this.props.address;
    const address = this.context.web3.toChecksumAddress(acc);
    return (
      <div className={styles.account} title={this.renderTitle(address)}>
        <Identicon seed={acc} />
        { this.renderName(address) }
        { this.renderBalance() }
      </div>
    );
  }

  renderTitle = (address) => {
    if (this.props.name) {
      return address + ' ' + this.props.name;
    }

    return address;
  }

  renderBalance () {
    const { balance } = this.state;
    if (balance === null) {
      return (
        <span className={styles.balance}> (...)</span>
      );
    }
    const val = this.context.web3.fromWei(balance);
    return (
      <span className={styles.balance}> {val.toFixed(2)} Eth</span>
    );
  }

  renderName (address) {
    const {name} = this.props;
    if (!name) {
      return (
        <span className={styles.address}>
          [{ this.shortAddress(address) }]
        </span>
      );
    }
    return (
      <span>
        <span className={styles.name}>{name}</span>
        <span className={styles.address}>[{ this.tinyAddress(address) }]</span>
      </span>
    );
  }

  tinyAddress (acc) {
    const len = acc.length;
    return acc.slice(2, 4) + '..' + acc.slice(len - 2);
  }

  shortAddress (acc) {
    const len = acc.length;
    return acc.slice(2, 8) + '..' + acc.slice(len - 7);
  }

  static propTypes = {
    address: React.PropTypes.string.isRequired,
    name: React.PropTypes.string
  };

}
