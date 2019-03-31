class Users::ConfirmationsController < Devise::ConfirmationsController
  # GET /resource/confirmation/new
  # def new
  #   super
  # end

  # POST /resource/confirmation
  def resend
        puts "Resend"
    #@email = params[:email]
    #@user = User.find_by(email: @email)
    #
    #if @user && @user.confirmed_at.nil?
    #  @user.send_confirmation_instructions({
    # client_config: params[:config_name]
    #  })
    #  render status: 200, json: {
    #      email: @email,
    #      message: 'Your request has been received. A new confirmation email has been sent.'
    #  }.to_json
    #elsif @user && @user.confirmed_at.present?
    #  render status: 200, json: {
    #      email: @email,
    #      message: 'This account has already been confirmed.'
    #  }.to_json
    #else
    #  render status: 404, json: {
    #      email: @email,
    #      message: 'No user account exists for this email.'
    #  }.to_json
    #end
  end

  # GET /resource/confirmation?confirmation_token=abcdef
  # def show
  #   super
  # end

  # protected

  # The path used after resending confirmation instructions.
  # def after_resending_confirmation_instructions_path_for(resource_name)
  #   super(resource_name)
  # end

  # The path used after confirmation.
  # def after_confirmation_path_for(resource_name, resource)
  #   super(resource_name, resource)
  # end
end
