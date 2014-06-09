class SessionsController < ApplicationController
  def new
    user = User.find_by_name(params[:name])
    if user and user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to index_appointment_path #todo fix this to work correctly on login
    else
      redirect_to login_url, alert: "Invalid user/password combination"
    end
  end

  def create
    user = User.find_by_name(params[:name])
    if user and user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to admin_url
    else
      redirect_to login_url, alert: "Invalid user/password combination"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_url, notice: "logged out"
  end
end
