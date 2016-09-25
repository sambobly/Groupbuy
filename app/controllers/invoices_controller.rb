class InvoicesController < InheritedResources::Base

  respond_to :json

  #def update
  #
  #end


  #invoice = post.invoice
  #lines = invoive.lines
  #
  #foreach (line in lines) {
  #    // isnert line in the database
  #}
  # Figure out how to write in ruby

  protected
  def begin_of_association_chain
    if params[:patient_id]
      patient = Patient.find(params[:patient_id])
    else
      nil
    end
  end
  private

  def invoice_params
    params.require(:invoice).permit(:id, :date, :doctor, :appointment, :item, :name, :price, :quantity, :tax, :discount, :total, :note, :item_name, :product, :concession_type, :patient_id)
  end
end

