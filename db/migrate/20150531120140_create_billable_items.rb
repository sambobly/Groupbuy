class CreateBillableItems < ActiveRecord::Migration
  def change
    create_table :billable_items do |t|
      t.string :name
      t.string :type
      t.decimal :price
      t.integer :tax
      t.decimal :total

      t.timestamps
    end
  end
end
