class UsersController < ApplicationController
  def index
    @users = User.all

    respond_to do |format|
      format.html
      format.js { render json: @users }
    end
  end
end
