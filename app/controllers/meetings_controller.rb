class MeetingsController < InheritedResources::Base

  respond_to :json

  protected
  def begin_of_association_chain
    if params[:patient_id]
      patient = Patient.find(params[:patient_id])
    else
      nil
    end
  end

  private

    def meeting_params
      params.require(:meeting).permit(:doctor_id, :patient_id, :appointment_id, :content, :date, :time)
    end
end

