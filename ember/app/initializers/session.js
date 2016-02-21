export function initialize(application) {
  application.register('session:service', 'session', { singleton: true });
  application.inject('controller', 'session', 'service:session');
}

export default {
  name: 'session',
  initialize
};
