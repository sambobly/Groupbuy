class AccountsController < InheritedResources::Base

  respond_to :json

  private

    def account_params
      params.require(:account).permit(:companyname, :firstname, :lastname, :email, :country)
    end
end

