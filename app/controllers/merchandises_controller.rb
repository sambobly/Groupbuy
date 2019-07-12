class MerchandisesController < InheritedResources::Base


  respond_to :json


  protected
  def begin_of_association_chain
    if params[:category_id]
      category = Category.find(params[:category_id])
    elsif params[:consumer_id]
      consumer = Consumer.find(params[:consumer_id])
    elsif params[:combination_id]
      combination = Combination.find(params[:combination_id])
    else
      nil
    end
    end
  private

    def merchandise_params
      params.require(:merchandise).permit(:value, :category_id, :consumer_id, :title, :description, :start, :end, :category_name, :bid, :difference, :consumer_name, :complete, :email, :received, :paid, :rescue, :images, :winner, :combination_id)
    end
end

