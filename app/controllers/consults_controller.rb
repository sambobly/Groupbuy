class ConsultsController < InheritedResources::Base

  respond_to :json

  protected
  def begin_of_association_chain
    if params[:patient_id]
      nest = Patient.find(params[:patient_id])
    else
      nil
    end
  end

  private

    def consult_params
      params.require(:consult).permit(:patient, :doctor, :appointment, :date, :time, :note, :patient_id, :doctor_id, :appointment_id)
    end
end

