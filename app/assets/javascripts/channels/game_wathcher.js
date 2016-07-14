App.game_wathcher = App.cable.subscriptions.create('GameWathcherChannel', {
  connected: function() {
    console.log('game_wathcher connected');
  },
  disconnected: function() {
    console.log('game_wathcher disconnected');
  },
  received: function(data) {
    if (data.action === 'start') {
      App.chessboard.startGame(data);
    }
    if (data.action === 'move') {
      var piecePlayer = _.find(App.chessboard.players, {id: data.player_id});
      _.find(App.chessboard.players, {id: data.turn_player_id}).activate();
      App.chessboard.pieces[data.piece.y_index][data.piece.x_index].addClass('active active-' + piecePlayer.color);
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
  move: function(piece) {
    this.perform('move', {
      player_id: App.getCurrentUser().id,
      turn_player_id: App.chessboard.matchPlayer.id,
      piece: piece
    });
  }
});
