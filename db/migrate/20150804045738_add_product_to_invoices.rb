class AddProductToInvoices < ActiveRecord::Migration
  def change
    add_column :invoices, :product, :string
  end
end
