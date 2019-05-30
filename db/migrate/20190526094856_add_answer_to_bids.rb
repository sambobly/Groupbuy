class AddAnswerToBids < ActiveRecord::Migration
  def change
    add_column :bids, :answer, :string
  end
end
