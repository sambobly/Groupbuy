class BidsController < InheritedResources::Base
  respond_to :json
  protected
  def begin_of_association_chain
    if params[:merchandise_id]
      merchandise = Merchandise.find(params[:merchandise_id])

    elsif params[:consumer_id]
      consumer = Consumer.find(params[:consumer_id])
    elsif params[:combination_id]
      combination = Combination.find(params[:combination_id])
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

    def bid_params
      params.require(:bid).permit(:consumer_id, :value, :comment, :merchandise_id, :success, :created_at, :updated_at, :complete, :merchandise_image, :merchandise_value, :merchandise_title, :answer, :score,:answer_one, :answer_two, :answer_three, :answer_four, :answer_five, :answer_six, :answer_seven, :answer_eight, :answer_nine, :answer_ten)
    end
end

