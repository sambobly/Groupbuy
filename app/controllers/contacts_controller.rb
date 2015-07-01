class ContactsController < InheritedResources::Base

  respond_to :json

  private

    def contact_params
      params.require(:contact).permit(:firstname, :lastname, :phone, :occupation, :company, :email, :address, :city, :state, :postcode, :note)
    end
end

