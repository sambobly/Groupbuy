class TaxesController < InheritedResources::Base
  respond_to :json

  def index
    @taxes = Taxes.all

  end
  private

    def tax_params
      params.require(:tax).permit(:name, :amount)
    end
end

