class ApplicationController < ActionController::Base
  layout false
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # Turn on request forgery protection
  #protect_from_forgery

  after_filter :set_csrf_cookie_for_ng

  def index

  end
  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end  #before_filter :authorize

  protected
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  # In Rails 4.1 and below
  def verified_request?
    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
  end
 # def authorize
  #  unless User.find_by_id(session[:user_id])
  #    redirect_to login_url, notice: "Please log in"
   # end
  #end

  def home

    if params [:doctor_id]
      @appointments = Appointment.where(doctor_id: params[:doctor_id])
    else
      @appointments = Appointment.all
    end
  end


end
