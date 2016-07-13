(function() {
  'use strict';

  App.Player = function Player(options) {
    $.extend(this, options);
    this.pieces = this.pieces || [];
  };

  App.Player.prototype.move = function(piece) {
    if (this.isActive()) {
      piece = $(piece);
      piece.addClass('active active-' + this.color);
      this.pieces.push(piece);
    }
  };

  App.Player.prototype.isActive = function() {
    return this.status === 'active';
  };

  App.Player.prototype.activate = function() {
    this.status = 'active';
    return this;
  };

  App.Player.prototype.disactivate = function() {
    this.status = 'disactive';
    return this;
  };

  App.Player.prototype.setOffensive = function() {
    this.color = 'black';
    return this;
  };

  App.Player.prototype.setDefensive = function() {
    this.color = 'white';
    return this;
  };
})();
