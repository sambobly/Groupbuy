class CreateLetters < ActiveRecord::Migration
  def change
    create_table :letters do |t|
      t.string :subject
      t.string :content
      t.references :patient, index: true
      t.references :doctor, index: true
      t.references :appointment, index: true

      t.timestamps
    end
  end
end
