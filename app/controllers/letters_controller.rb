class LettersController < InheritedResources::Base

  respond_to :json

  def test
    @letter = Letter.find_by_id(params[:letter])
    @patient = Patient.find_by_id(params[:patient])
    p "RAILS TEST"
    ModelMailer.letter_email(@letter, @patient).deliver
    #debugger
    puts "Rails"
  end

  def claim
    p "Claim"
    ModelMailer.test_email(@consumer).deliver

    puts "claim"
  end
  protected
  def begin_of_association_chain
    if params[:patient_id]
      patient = Patient.find(params[:patient_id])
    else
      nil
    end
  end

  def begin_of_association_chain
    if params[:doctor_id]
      patient = Patient.find(params[:doctor_id])
    elsif params[:patient_id]
      patient = Patient.find(params[:patient_id])
    else
      nil
    end
  end
  private

    def letter_params
      params.require(:letter).permit(:subject, :content, :patient_id, :doctor_id, :appointment_id, :consumer_id, :email)
    end
end

