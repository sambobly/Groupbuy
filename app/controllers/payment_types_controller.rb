class PaymentTypesController < InheritedResources::Base

  respond_to :json

  private

    def payment_type_params
      params.require(:payment_type).permit(:name)
    end
end

