class AddTestToExpenses < ActiveRecord::Migration
  def change
    add_column :expenses, :test, :string
  end
end
