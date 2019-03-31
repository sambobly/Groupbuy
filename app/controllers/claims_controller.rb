class ClaimsController < InheritedResources::Base
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
  end

private

    def claim_params
      params.require(:claim).permit(:consumer_id, :merchandise_id, :email, :mobile, :account, :bsb, :complete)
    end
end

