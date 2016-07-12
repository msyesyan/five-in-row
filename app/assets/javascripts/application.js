//= require lodash
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require_self
//= require_tree ./components
//= require_tree ./store
//= require cable

(function() {
  'use strict';

  window.App = window.App || {};

  App.getCurrentUser = function() {
    return window.currentUser || {};
  };
})();

