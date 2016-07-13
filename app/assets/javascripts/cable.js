//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  'use strict';

  App.cable = ActionCable.createConsumer();
})();
