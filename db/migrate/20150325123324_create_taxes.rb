class CreateTaxes < ActiveRecord::Migration
  def change
    create_table :taxes do |t|
      t.text :name
      t.integer :amount

      t.timestamps
    end
  end
end
