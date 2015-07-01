class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses do |t|
      t.date :date
      t.string :vendor
      t.string :category
      t.decimal :amount
      t.decimal :tax
      t.decimal :taxamount
      t.string :note
      t.boolean :product

      t.timestamps
    end
  end
end
