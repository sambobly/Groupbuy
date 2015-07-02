class CreateConcessionTypes < ActiveRecord::Migration
  def change
    create_table :concession_types do |t|
      t.string :name
      t.integer :percentage

      t.timestamps
    end
  end
end
