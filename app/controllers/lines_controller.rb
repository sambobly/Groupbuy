class LinesController < InheritedResources::Base
  respond_to :json

  # add has one relationship with products

  #def create
  #  params[:line][:product_id]=params[:line][:product][:id]
  #  resource = Line.create(params[:line])
  #
  #  respond_with(resource)
  #end

  #def create
  #
  #  params[:line][:product_id]=params[:line][:product][:id]
  #  resource = Line.create(params[:line])
  #
  #  respond_with(resource)
  #end
  #def show
  #  params[:line][:product_id]=params[:line][:product][:id]
  #  resource = Line.create(params[:line])
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

  #def begin_of_association_chain2
  #  if params[:product_id]
  #    product = product.find(params[:product_id])
  #  else
  #    nil
  #  end
  #end
  private

    def line_params
      params.require(:line).permit(:invoice_id, :item, :price, :quantity, :tax, :discount, :total, :product, :product_id)
    end
end


