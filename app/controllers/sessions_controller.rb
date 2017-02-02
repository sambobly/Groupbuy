class SessionsController < ApplicationController
  respond_to :json

  def new
    p "RAILS TEST"
    user = User.find_by_name(params[:name])
    if user and user.authenticate(params[:password])
      Rails.logger.info user.inspect
      session[:user_id] = user.id
      redirect_to index_appointment_path #todo fix this to work correctly on login
    else
      redirect_to login_url, alert: "Invalid user/password combination"
    end
  end

  def create
    p "RAILS TEST"

    user = User.find_by_name(params[:name])
    if user and user.authenticate(params[:password])
      Rails.logger.info user.inspect
      p "RAILS TEST"
      session[:user_id] = user.id
      redirect_to admin_url
    else
      redirect_to login_url, alert: "Invalid user/password combination"
    end
  end

  def destroy
    p "RAILS TEST"

    session[:user_id] = nil
    redirect_to login_url, notice: "logged out"
  end
end
