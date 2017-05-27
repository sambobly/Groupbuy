class CreateWidgets < ActiveRecord::Migration
  def change
    create_table :widgets do |t|
      t.references :product, index: true
      t.references :invoice, index: true
      t.string :item
      t.decimal :price
      t.integer :quantity
      t.decimal :tax
      t.decimal :discount
      t.decimal :total
      t.string :product

      t.timestamps
    end
  end
end
