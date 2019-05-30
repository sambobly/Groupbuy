class AddScoreToBids < ActiveRecord::Migration
  def change
    add_column :bids, :score, :string
  end
end
