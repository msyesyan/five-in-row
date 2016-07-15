(function() {
  'use strict';

  App.Chessboard = function Chessboard(options) {
    $.extend(this, options);
    this.element = $(this.element);
    this.columns = 15;
    this.pieces = [];
    this.render();
  };

  App.Chessboard.prototype.render = function() {
    var pieceWidth = Math.floor(this.element.width() / this.columns);
    var rowTemplate = '<div class="chessboard-row"></div>';
    var pieceTemplate = '<div class="cell">';

    for (var i = 0; i < this.columns; i++) {
      var pieces = [];
      var row = $(rowTemplate);
      for (var j = 0; j < this.columns; j++) {
        pieces.push($(pieceTemplate).
          data('xIndex', j).data('yIndex', i).
          css({ 'width': pieceWidth - 2 + 'px', 'height': pieceWidth - 2 + 'px' }).
          appendTo(row)
        );
      }
      row.appendTo(this.element);
      this.pieces.push(pieces);
    }
  };

  App.Chessboard.prototype.startGame = function(options) {
    $.extend(this, options);
    this.initilizePlayers();
    this.initilizeEvents();
  };

  App.Chessboard.prototype.initilizePlayers = function() {
    //for now, default is demo1, and demo2
    this.offensivePlayer = App.PlayerStore.find(this.offensive_player_id).setOffensive().activate();
    this.defensivePlayer = App.PlayerStore.find(this.defensive_player_id).setDefensive();
    this.players = [this.offensivePlayer,  this.defensivePlayer];
    this.currentPlayer = this.offensivePlayer.id === App.getCurrentUser().id ? this.offensivePlayer : this.defensivePlayer;

    if (this.offensivePlayer.id === App.getCurrentUser().id) {
      this.currentPlayer = this.offensivePlayer;
      this.matchPlayer = this.defensivePlayer;
    } else {
      this.currentPlayer = this.defensivePlayer;
      this.matchPlayer = this.offensivePlayer;
    }
  };

  App.Chessboard.prototype.initilizeEvents = function() {
    this.element.on('click', '.cell', $.proxy(this.handleClickPiece, this));
  };

  App.Chessboard.prototype.handleClickPiece = function(event) {
    if (this.currentPlayer.isActive()) {
      var piece = $(event.target);
      this.currentPlayer.move(piece);
    }
  };
})();
