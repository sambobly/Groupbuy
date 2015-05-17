class ProductsController < InheritedResources::Base

  respond_to :json

  private

  def product_params
    params.require(:product).permit(:name, :price)
  end
end
