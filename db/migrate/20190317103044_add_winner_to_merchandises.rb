class AddWinnerToMerchandises < ActiveRecord::Migration
  def change
    add_column :merchandises, :winner, :string
  end
end
