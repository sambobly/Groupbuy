class CreateLines < ActiveRecord::Migration
  def change
    create_table :lines do |t|
      t.references :invoice, index: true
      t.text :item
      t.decimal :price
      t.integer :quantity
      t.decimal :tax
      t.decimal :discount
      t.decimal :total
      t.text :product

      t.timestamps
    end
  end
end
