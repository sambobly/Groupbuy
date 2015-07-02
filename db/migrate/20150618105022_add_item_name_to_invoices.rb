class AddItemNameToInvoices < ActiveRecord::Migration
  def change
    add_column :invoices, :item_name, :string
  end
end
