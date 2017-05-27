class Users::SessionsController < Devise::SessionsController
  prepend_before_filter :require_no_authentication, only: [:cancel ]

  respond_to :json

  def create
    #respond_to do |format|
    #  format.html { super }
    #  format.json {
    #    warden.authenticate!(:scope => resource_name, :recall => "#user#new")
    #    render :status => 200, :json => { :error => "Success" }
    #  }
    #end
    super do |user|
      if request.format.json?
        data = {
            id: user.id,
            email: user.email,
            name: user.name
        }
        render json: data, status: 201 and return
      end
    end
    end

  def destroy
    warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    sign_out
    render :status => 200,
           :json => { :success => true,
                      :info => "Logged out",
           }
  end

  def failure
    render :status => 401,
           :json => { :success => false,
                      :info => "Login Credentials Failed"
           }
  end

  def show_current_user
      @current_user ||= User.find_by(id: session[:user_id])
    #warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#failure")
    #render :status => 200,
    #       :json => { :success => true,
    #                  :info => "Current User",
    #                  :user => current_user
    #       }

  end
    #respond_to :json
    #prepend_before_action :require_no_authentication, only: [:new, :create]
    #prepend_before_action :allow_params_authentication!, only: :create
    #prepend_before_action :verify_signed_out_user, only: :destroy
    #prepend_before_action only: [:create, :destroy] { request.env["devise.skip_timeout"] = true }
    #def new
    #  p "RAILS users sessions controller"
    #  self.resource = resource_class.new(sign_in_params)
    #  clean_up_passwords(resource)
    #  yield resource if block_given?
    #  respond_with(resource, serialize_options(resource))
    #end
    #  #user = User.find_by_name(params[:name])
    #  #if user
    #  #  Rails.logger.info user.inspect
    #  #  session[:user_id] = user.id
    #  #  #redirect_to index_appointment_path #todo fix this to work correctly on login
    #  #else
    #  #  redirect_to login_url, alert: "Invalid user/password combination"
    #  #end
    #end
    #
    #def create
    #  p "RAILS TEST"
    #  respond_to do |format|
    #    format.json { render :json => @user }
    #  end
    #  self.resource = warden.authenticate!(auth_options)
    #  sign_in(resource_name, resource)
    #  yield resource if block_given?
    #  respond_with resource, location: after_sign_in_path_for(resource)
    #  Rails.logger.info resource
    #
    #  #user = User.find_by_name(params[:name])
    #  #if user
    #  #  Rails.logger.info user.inspect
    #  #  p "RAILS TEST"
    #  #  session[:user_id] = user.id
    #  #  #redirect_to admin_url
    #  #else
    #  #  redirect_to login_url, alert: "Invalid user/password combination"
    #  #end
    #end
    #
    #def destroy
    #  p "RAILS TEST"
    #  signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    #  yield if block_given?
    #  respond_to_on_destroy
    #  #
    #  #session[:user_id] = nil
    #  #redirect_to login_url, notice: "logged out"
    end
# before_filter :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # You can put the params you want to permit in the empty array.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end

