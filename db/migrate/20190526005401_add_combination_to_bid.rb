class AddCombinationToBid < ActiveRecord::Migration
  def change
    add_reference :bids, :combination, index: true, foreign_key: true
  end
end
