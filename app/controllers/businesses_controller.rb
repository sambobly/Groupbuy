class BusinessesController < InheritedResources::Base

  respond_to :json
  private

    def business_params
      params.require(:business).permit(:name, :address, :city, :state, :postcode, :country, :registrationname, :registrationnumber, :website, :contact, :online)
    end
end

