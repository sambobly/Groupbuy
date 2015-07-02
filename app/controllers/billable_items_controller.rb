class BillableItemsController < InheritedResources::Base
  respond_to :json

  private

    def billable_item_params
      params.require(:billable_item).permit(:name, :type, :price, :tax, :total)
    end
end

