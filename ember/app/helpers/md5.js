import Ember from 'ember';
import cryptoJS from 'npm:crypto-js';

export function md5(params) {
  return cryptoJS.MD5(params[0]);
}

export default Ember.Helper.helper(md5);
