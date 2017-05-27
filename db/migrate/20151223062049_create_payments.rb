class CreatePayments < ActiveRecord::Migration
  def change
    create_table :payments do |t|
      t.references :patient, index: true
      t.references :doctor, index: true
      t.references :invoice, index: true
      t.references :paymentType, index: true
      t.references :appointment, index: true
      t.date :date
      t.text :note
      t.decimal :total

      t.timestamps
    end
  end
end
