class UserAppearanceChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from 'user_appearance'
  end

  def appear(data)
    user = find_user_by_id(data['user_id'])
    user.appear if user.present?
  end

  private

  def find_user_by_id(params)
    @user ||= User.find_by_id(params['user_id'])
  end
end
