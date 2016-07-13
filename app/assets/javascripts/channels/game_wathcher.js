App.game_wathcher = App.cable.subscriptions.create('GameWathcherChannel', {
  connected: function() {
    console.log('game_wathcher connected');
  },

  disconnected: function() {
    console.log('game_wathcher disconnected');
  },

  received: function(data) {
    if (data.player_id) {
      if (data.player_id === App.getCurrentUser().id) {
        _.find(App.chessboard.players, {id: data.player_id}).activate();
      }
    } else {
      App.chessboard.startGame(data);
    }
  },

  start: function() {
    var offensivePlayerId = App.getCurrentUser().id;
    var defensivePlayerId = offensivePlayerId === 1 ? 2 : 1;

    this.perform('start', {
      offensive_player_id: offensivePlayerId,
      defensive_player_id: defensivePlayerId
    });
  },

  turnPlayer: function(playerId) {
    this.perform('turn_player', {
      player_id: playerId
    });
  }
});
