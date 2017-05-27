class AddConcessionTypeToExpenses < ActiveRecord::Migration
  def change
    add_column :expenses, :concession_type, :string
  end
end
