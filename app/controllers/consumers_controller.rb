class ConsumersController < InheritedResources::Base
  respond_to :json
  protected
  def begin_of_association_chain
    if params[:user_id]
      user = User.find(params[:user_id])

    else
      nil
    end
    end
  private

    def consumer_params
      params.require(:consumer).permit(:name, :first_name, :last_name, :date_of_birth, :payment_method_id, :public, :gender, :pronoun, :email, :number, :password, :user_id)
    end
end

