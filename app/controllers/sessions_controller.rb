class SessionsController < Devise::SessionsController
  after_action :after_sign_in, only: :create

  def after_sign_in
    current_user.appear
  end

  def destroy
    current_user.away
    super
  end
end
