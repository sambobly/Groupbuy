class EmailsController < InheritedResources::Base
  def test
    #@email = email.find_by_id(params[:email])
    @user = User.find_by_id(params[:user])
    p "RAILS TEST"
    ModelMailer.test_email(@user).deliver
    #debugger
    puts "Rails"
  end

  private

    def email_params
      params.require(:email).permit(:subject, :content, :patient_id, :doctor_id, :consumer_id, :consumer_name, :merchandise_name, :bid_id)
    end
end

