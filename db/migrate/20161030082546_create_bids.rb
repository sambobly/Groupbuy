class CreateBids < ActiveRecord::Migration
  def change
    create_table :bids do |t|
      t.references :consumer, index: true
      t.decimal :value
      t.string :comment
      t.references :merchandise, index: true
      t.boolean :success

      t.timestamps
    end
  end
end
