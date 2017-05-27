class WishesController < InheritedResources::Base
  respond_to :json
  protected
  def begin_of_association_chain
    if params[:merchandise_id]
      merchandise = Merchandise.find(params[:merchandise_id])

    elsif params[:consumer_id]
      consumer = Consumer.find(params[:consumer_id])
    else
      nil
    end

    #if params[:patient_id]
    #  patient = Patient.find(params[:patient_id])
    #else
    #  nil
    #end
  end
  private

    def wish_params
      params.require(:wish).permit(:consumer_id, :merchandise_id)
    end
end

