class ProductsController < InheritedResources::Base

  respond_to :json

  #def begin_of_association_chain
  #  if params[:product_id]
  #    product = Product.find(params[:product_id])
  #  else
  #    nil
  #  end
  #end

  private

  def product_params
    params.require(:product).permit(:name, :price)
  end
end
