class GameWathcherChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from 'game_wathcher'
  end

  def start(data)
    ActionCable.server.broadcast(
      'game_wathcher',
      offensive_player_id: data['offensive_player_id'],
      defensive_player_id: data['defensive_player_id']
    )
  end

  def turn_player(data)
    ActionCable.server.broadcast(
      'game_wathcher',
      player_id: data['player_id']
    )
  end
end
