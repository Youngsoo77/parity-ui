import React from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

import Identicon from '../Identicon';
import styles from './CreateAccount.css';
import Web3Component from '../Web3Component/Web3Component';

export default class AccountDetails extends Web3Component {

  state = {};

  render () {
    const { open } = this.props;

    return (
      <Dialog
        title='Create Account'
        actions={this.renderDialogActions()}
        open={open}
        autoScrollBodyContent
        onRequestClose={this.onClose}
        >
        {this.renderNoAccountsMsg()}
        {this.renderForm()}
        {this.renderCreatedAccount()}
      </Dialog>
    );
  }

  renderForm () {
    return (
      <div>
        <TextField
          fullWidth
          type='password'
          name={'new-account-password'}
          floatingLabelText='`DATA` - Password'
          value={this.state.password}
          onChange={this.modifyPassword}
        />
        <RaisedButton
          label='Submit'
          primary
          onTouchTap={this.submit}
        />
      </div>
    );
  }

  renderCreatedAccount () {
    const { createdAccount } = this.state;
    if (!createdAccount) {
      return;
    }

    return (
      <p className={styles.newAccount}>
        Your new account is <Identicon seed={createdAccount} /><strong>{createdAccount}</strong>. <br />
        You can now choose it in the top right corner and expose it to dapps.
      </p>
    );
  }

  renderNoAccountsMsg () {
    if (this.props.accounts.length) {
      return;
    }
    return (
      <p className={styles.noAccount}>
        You have no accounts associated with your running parity node.<br />
        Enter a passphrase belo and click submit to create one.
      </p>
    );
  }

  submit = () => {
    const createdAccount = this.context.web3.personal.newAccount(this.state.password);
    this.setState({ createdAccount });
  }

  modifyPassword = (evt) => {
    this.setState({ password: evt.target.value });
  }

  renderDialogActions () {
    return [
      <FlatButton
        label='Ok'
        secondary
        onTouchTap={this.onClose}
      />
    ];
  }

  onClose = () => {
    this.props.onClose();
  }

  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    accounts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    onClose: React.PropTypes.func.isRequired
  };

}
