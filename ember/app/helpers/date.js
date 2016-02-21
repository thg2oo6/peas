import Ember from 'ember';
import moment from 'moment';

export function date(params) {
  return moment(params[0]).format("Do MMM YYYY");
}

export default Ember.Helper.helper(date);
