class ConsumersController < InheritedResources::Base
  respond_to :json

  def claim
    p "Claim"
    ModelMailer.test_email(@consumer).deliver

    puts "claim"
  end

  def fail
    p "Fail"
    @merchandise = Merchandise.find_by_id(params[:merchandise])
    @consumer = Consumer.find_by_id(params[:consumer])
    ModelMailer.fail_email(@consumer, @merchandise).deliver_now
    puts "fail"
  end

  def test
    p "RAILS TEST"
    @merchandise = Merchandise.find_by_id(params[:merchandise])
    @consumer = Consumer.find_by_id(params[:consumer])
    ModelMailer.claim_email(@consumer, @merchandise).deliver_now

  end

  protected
  def begin_of_association_chain
    if params[:user_id]
      user = User.find(params[:user_id])

    else
      nil
    end
    end
  private

    def consumer_params
      params.require(:consumer).permit(:name, :first_name, :last_name, :date_of_birth, :payment_method_id, :public, :gender, :pronoun, :email, :number, :password, :user_id, :avatar)
    end

end

