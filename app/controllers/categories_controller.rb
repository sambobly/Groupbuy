class CategoriesController < InheritedResources::Base
  respond_to :json

  private

    def category_params
      params.require(:category).permit(:name, :description)
    end
end

