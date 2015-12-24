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
  private

  def invoice_params
    params.require(:invoice).permit(:id, :date, :patient, :doctor, :appointment, :item, :name, :price, :quantity, :tax, :discount, :total, :note, :item_name, :product, :concession_type, :patient_id)
  end
end

