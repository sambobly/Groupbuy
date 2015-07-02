class CreateInovices < ActiveRecord::Migration
  def change
    create_table :inovices do |t|
      t.date :date
      t.string :patient
      t.string :doctor
      t.string :appointment
      t.string :item
      t.decimal :price
      t.integer :quantity
      t.integer :tax
      t.integer :discount
      t.decimal :total
      t.string :note

      t.timestamps
    end
  end
end
