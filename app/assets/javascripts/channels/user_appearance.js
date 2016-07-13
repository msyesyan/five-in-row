(function() {
  'use strict';

  App.user_appearance = App.cable.subscriptions.create('UserAppearanceChannel', {
    connected: function() {
      setTimeout(function() {
        this.appear();
      }.bind(this), 1000);
    },

    disconnected: function() {
      console.log('disconnected');
    },

    received: function(data) {
      var statusIcon = $('#list-users').find('li[data-user-id=' + data.id + ']').find('.user-status')[0];
      if (statusIcon) {
        var className = statusIcon.className.replace(/user-status-\w*/g, 'user-status-' + data.status);
        statusIcon.className = className;
      }
      if (data.status === 'online') {
        App.PlayerStore.push(new App.Player({
          id: data.id
        }));
      } else {
        App.PlayerStore.remove(data.id);
      }
      var readyStart = App.PlayerStore.all().length === 2;
      $('#btn-start').toggleClass('disabled', !readyStart).prop('disabled', !readyStart);
    },

    appear: function() {
      App.PlayerStore.push(new App.Player({
        id: App.getCurrentUser().id
      }));
      var readyStart = App.PlayerStore.all().length === 2;
      $('#btn-start').toggleClass('disabled', !readyStart).prop('disabled', !readyStart);
      this.perform('appear', { user_id: App.getCurrentUser().id });
    }
  });
})();
