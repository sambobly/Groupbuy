class AddPatientToInvoices < ActiveRecord::Migration
  def change
    add_reference :invoices, :patient, index: true
  end
end
