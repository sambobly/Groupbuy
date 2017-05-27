class AddCompleteToBids < ActiveRecord::Migration
  def change
    add_column :bids, :complete, :boolean
  end
end
