class AddConcessionTypeToInvoices < ActiveRecord::Migration
  def change
    add_column :invoices, :concession_type, :string
  end
end
