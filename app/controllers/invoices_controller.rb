class InvoicesController < InheritedResources::Base

  respond_to :json

  private

    def invoice_params
      params.require(:invoice).permit(:date, :patient, :doctor, :name, :appointment, :item, :price, :quantity, :tax, :discount, :total, :note, :item_name)
    end
end

