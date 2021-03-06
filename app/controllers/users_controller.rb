class UsersController < InheritedResources::Base
  respond_to :json
  before_action :authenticate_user!
  #before_action :configure_permitted_parameters!
  #before_action :set_user, only: [:show, :edit, :update, :destroy]
  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :password_digest, :id, :current_password)
  end


def index
    p "RAILS TEST"

    @users = User.order(:name)

    respond_to do |format|
      format.html # index.html
      format.json { render json: @users }
    end
end

  def show
    p "User show"

    @user = User.find(params[:id])
        #@user = User.find(params[:id])
    format.json { render json: @user }
  end

 #def test
 #  p "RAILS TEST"
 #
 #  @user = User.find_by_id(params[:user])
 #  ModelMailer.claim_email(@user).deliver_now
 #
 #end


end

#class UsersController < ApplicationController
#  before_action :set_user, only: [:show, :edit, :update, :destroy]
#  before_action :authenticate_user!
#  respond_to :json
#
#  # GET /users
#  # GET /users.json
#  def index
#    p "RAILS TEST"
#
#    @users = User.order(:name)
#
#    respond_to do |format|
#      format.html # index.html
#      format.json { render json: @users }
#    end
#  end
#
#  # GET /users/1
#  # GET /users/1.json
#  def show
#
#  end
#
#  # GET /users/new
#  def new
#    p "RAILS TEST"
#
#    @user = User.new
#  end
#
#  # GET /users/1/edit
#  def edit
#
#  end
#
#  def test
#    p "RAILS TEST"
#    @user = User.find(3)
#
#  end
#
#  # POST /users
#  # POST /users.json
#  def create
#    @user = User.new(user_params)
#
#    respond_to do |format|
#      if @user.save
#        format.html { redirect_to users_url, notice: "User #{@user.name} was successfully created." }
#        format.json { render json: @user, status: :created, location: @user }
#      else
#        format.html { render action: 'new' }
#        format.json { render json: @user.errors, status: :unprocessable_entity }
#      end
#    end
#  end
#
#  # PATCH/PUT /users/1
#  # PATCH/PUT /users/1.json
#  def update
#    respond_to do |format|
#      if @user.update(user_params)
#        format.html { redirect_to users_url, notice: "User #{@user.name} was successfully updated." }
#        format.json { head :no_content }
#      else
#        format.html { render action: 'edit' }
#        format.json { render json: @user.errors, status: :unprocessable_entity }
#      end
#    end
#  end
#
#  # DELETE /users/1
#  # DELETE /users/1.json
#  def destroy
#    @user = User.find(params[:id])
#    begin
#      @user.destroy
#      flash[:notice] = "User #{@user.name} deleted"
#    rescue Exception => e
#      flash[:notice] = e.message
#      end
#    end
#    respond_to do |format|
#      format.html { redirect_to users_url }
#      format.json { head :no_content }
#    end
#
#
#  private
#    # Use callbacks to share common setup or constraints between actions.
#    def set_user
#      @user = User.find(params[:id])
#    end
#
#    # Never trust parameters from the scary internet, only allow the white list through.
#    def user_params
#      params.require(:user).permit(:name, :password, :password_confirmation, :password_digest)
#    end
#end
