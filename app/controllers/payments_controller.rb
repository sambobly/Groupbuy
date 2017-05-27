class PaymentsController < InheritedResources::Base

  respond_to :json
  #def index
  #end

  protected
  def begin_of_association_chain
    if params[:invoice_id]
      invoice = Invoice.find(params[:invoice_id])
    elsif params[:patient_id]
        patient = Patient.find(params[:patient_id])
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

    def payment_params
      params.require(:payment).permit(:patient_id, :doctor_id, :invoice_id, :paymentType_id, :appointment_id, :date, :note, :total)
    end
end

