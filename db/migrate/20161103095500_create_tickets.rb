class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.references :consumer, index: true
      t.references :bid, index: true
      t.references :merchandise, index: true
      t.boolean :win
      t.integer :value

      t.timestamps
    end
  end
end
