class TwigsController < InheritedResources::Base
  respond_to :json

  def test
    p "RAILS TEST"
    #ModelMailer.create_new_record_notification(patient).deliver
    #debugger
    #puts Rails
  end

  private

  def twig_params
    params.require(:twig).permit(:name, :id)
  end


end

