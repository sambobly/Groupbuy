class AddLineToInvoice < ActiveRecord::Migration
  def change
    add_column :invoices, :lines, :string
  end
end
