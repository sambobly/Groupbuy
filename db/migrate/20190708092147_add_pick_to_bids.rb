class AddPickToBids < ActiveRecord::Migration
  def change
    add_column :bids, :answer_one, :string
    add_column :bids, :answer_two, :string
    add_column :bids, :answer_three, :string
    add_column :bids, :answer_four, :string
    add_column :bids, :answer_five, :string
    add_column :bids, :answer_six, :string
    add_column :bids, :answer_seven, :string
    add_column :bids, :answer_eight, :string
    add_column :bids, :answer_nine, :string
    add_column :bids, :answer_ten, :string
  end
end
