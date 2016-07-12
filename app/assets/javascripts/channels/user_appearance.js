(function() {
  App.user_appearance = App.cable.subscriptions.create('UserAppearanceChannel', {
    connected: function() {
      console.log('connected');
      setTimeout(function() {
        this.appear();
      }.bind(this), 1000);
    },

    disconnected: function() {
      console.log('disconnected');
    },

    received: function(data) {
      console.log('received', data.id, data.status);
      var statusIcon = $('#list-users').find('li[data-user-id=' + data.id + ']').find('.user-status')[0];
      if (statusIcon) {
        var className = statusIcon.className.replace(/user-status-\w*/g, 'user-status-' + data.status);
        statusIcon.className = className;
      }
    },

    appear: function() {
      console.log('currentUserId', this.getCurrentUser().id);
      this.perform('appear', { user_id: this.getCurrentUser().id });
    },

    getCurrentUser: function() {
      return window.currentUser || {};
    },
  });
})();
