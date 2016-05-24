import React, { Component, PropTypes } from 'react';

import formatNumber from 'format-number';
import EditableValue from '../EditableValue';
import { numberFromString } from './numberFromString';
import { decodeExtraData } from './decodeExtraData';

const toNiceNumber = formatNumber();

export default class MiningSettings extends Component {

  render () {
    const { mining, actions } = this.props;

    let onMinGasPriceChange = (newVal) => {
      actions.modifyMinGasPrice(numberFromString(newVal));
    };

    let onExtraDataChange = (newVal, isResetToDefault) => {
      // In case of resetting to default we are just using raw bytes from defaultExtraData
      // When user sets new value we can safely send a string that will be converted to hex by formatter.
      const val = isResetToDefault ? mining.defaultExtraData : newVal;
      actions.modifyExtraData(val);
    };

    let onAuthorChange = (newVal) => {
      actions.modifyAuthor(newVal);
    };

    let onGasFloorTargetChange = (newVal) => {
      actions.modifyGasFloorTarget(numberFromString(newVal));
    };

    return (
      <div {...this._testInherit()}>
        <h1><span>Mining</span> settings</h1>
        <h3>Author</h3>
        <EditableValue
          value={mining.author}
          autocomplete
          dataSource={this.props.accounts}
          onSubmit={onAuthorChange}
          {...this._test('author')}
          />
        <h3>Extradata</h3>
        <EditableValue
          value={decodeExtraData(mining.extraData)}
          onSubmit={onExtraDataChange}
          defaultValue={decodeExtraData(mining.defaultExtraData)}
          {...this._test('extra-data')}
          />
        <h3>Minimal Gas Price</h3>
        <EditableValue
          value={toNiceNumber(mining.minGasPrice)}
          onSubmit={onMinGasPriceChange}
          {...this._test('min-gas-price')}
          />
        <h3>Gas floor target</h3>
        <EditableValue
          value={toNiceNumber(mining.gasFloorTarget)}
          onSubmit={onGasFloorTargetChange}
          {...this._test('gas-floor-target')}
          />
      </div>
    );
  }

  static propTypes = {
    accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
    version: PropTypes.string.isRequired,
    mining: PropTypes.shape({
      author: PropTypes.string.isRequired,
      extraData: PropTypes.string.isRequired,
      defaultExtraData: PropTypes.string.isRequired,
      minGasPrice: PropTypes.string.isRequired,
      gasFloorTarget: PropTypes.string.isRequired
    }).isRequired,
    actions: PropTypes.shape({
      modifyMinGasPrice: PropTypes.func.isRequired,
      modifyAuthor: PropTypes.func.isRequired,
      modifyGasFloorTarget: PropTypes.func.isRequired,
      modifyExtraData: PropTypes.func.isRequired,
      resetExtraData: PropTypes.func.isRequired
    }).isRequired
  }

}
