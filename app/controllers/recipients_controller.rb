class RecipientsController < InheritedResources::Base
  respond_to :json

  private

    def recipient_params
      params.require(:recipient).permit(:letter_id, :email, :name, :first_name, :last_name, :type)
    end
end

