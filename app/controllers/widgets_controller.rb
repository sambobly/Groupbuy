class WidgetsController < InheritedResources::Base

  respond_to :json

  #def create
  #
  #  params[:widget][:product_id]=params[:widget][:product][:id]
  #  params[:widget][:tax_id]=params[:widget][:tax][:id]
  #
  #  resource = Widget.create(params[:widget])
  #
  #  respond_with(resource)
  #end

  protected
  def begin_of_association_chain
    if params[:invoice_id]
      invoice = Invoice.find(params[:invoice_id])
    else
      nil
    end
  end

  private

    def widget_params
      params.require(:widget).permit(:product_id, :invoice_id, :item, :price, :quantity, :tax, :discount, :total, :product, :tax_id)
    end
end

