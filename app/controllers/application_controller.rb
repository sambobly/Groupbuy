class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  private

  def current_checkin
    Checkin.find(session[:checkin_id])
  rescue ActiveRecord::RecordNotFound
    checkin = Checkin.create
    session[:checkin_id] = checkin.id
    checkin
  end
end
