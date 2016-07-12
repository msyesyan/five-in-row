class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def appear
    update(status: 'online')
    broadcast_appearance_status
  end

  def away
    update(status: 'offline')
    broadcast_appearance_status
  end

  private

  def broadcast_appearance_status
    ActionCable.server.broadcast 'user_appearance', id: id, status: status
  end
end
