class FixInvoiceItemToName < ActiveRecord::Migration
  def change
     add_column :invoices, :name, :string
  end
end
