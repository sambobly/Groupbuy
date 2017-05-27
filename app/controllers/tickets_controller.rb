class TicketsController < InheritedResources::Base
  respond_to :json

  def begin_of_association_chain
    if params[:merchandise_id]
      merchandise = Merchandise.find(params[:merchandise_id])

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

    def ticket_params
      params.require(:ticket).permit(:consumer_id, :bid_id, :merchandise_id, :win, :value)
    end
end

