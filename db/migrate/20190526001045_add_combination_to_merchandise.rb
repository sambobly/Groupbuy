class AddCombinationToMerchandise < ActiveRecord::Migration
  def change
    add_reference :merchandises, :combination, index: true, foreign_key: true
  end
end
