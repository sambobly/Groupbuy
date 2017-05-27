class SessionsController < Devise::SessionsController
  respond_to :json

  def new
    p "Plain sessions controller"
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
    p "create from sessions"
    build_resource
    resource = User.find_for_database_authentication(:login=>params[:user_login][:login])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user_login][:password])
      sign_in("user", resource)
      render :json=> {:success=>true, :auth_token=>resource.authentication_token, :login=>resource.login, :email=>resource.email}
      return

    else
    invalid_login_attempt
    end
    #p "RAILS TEST"

    #
    #user = User.find_by_id(params[:id])
    #if user
    #  Rails.logger.info user.inspect
    #  p "RAILS TEST"
    #  session[:user_id] = user.id
    #else
    #  p "Failed"
    #end
  end

  def destroy
    p "RAILS TEST"

    session[:user_id] = nil
    redirect_to login_url, notice: "logged out"
  end

  def test
    p "Am I clicked?"
  end
end
