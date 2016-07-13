//= require ../components/player

(function() {
  'use strict';

  App.PlayerStore = {
    fetch: function() {
      $.get('/users', $.proxy(this.load, this), 'json');
    },
    load: function(users) {
      _.each(users, function(user) {
        if (user.status === 'online') {
          this.push(new App.Player(user));
        }
      }.bind(this));
    },
    all: function() {
      return this.players || [];
    },
    find: function(id) {
      return _.find(this.players, { id: id });
    },
    where: function(condition) {
      return _.filter(this.players, condition);
    },
    not: function(condition) {
      return _.filter(this.players, function(player) {
        return !_.isEqual(_.values(_.pick(player, _.keys(condition))), _.values(condition));
      });
    },
    push: function(player) {
      this.players = this.players || [];
      if (!this.find(player.id)) {
        this.players.push(player);
      }
      return this.players;
    },
    remove: function(player) {
      return _.remove(this.players, { id: player.id });
    }
  };
})();
