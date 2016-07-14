class GameWathcherChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from 'game_wathcher'
  end

  def start(data)
    ActionCable.server.broadcast(
      'game_wathcher',
      action: 'start',
      offensive_player_id: data['offensive_player_id'],
      defensive_player_id: data['defensive_player_id']
    )
  end

  def move(data)
    ActionCable.server.broadcast(
      'game_wathcher',
      action: 'move',
      player_id: data['player_id'],
      turn_player_id: data['turn_player_id'],
      piece: data['piece']
    )
  end
end
