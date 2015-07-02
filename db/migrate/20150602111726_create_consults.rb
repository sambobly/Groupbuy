class CreateConsults < ActiveRecord::Migration
  def change
    create_table :consults do |t|
      t.string :patient
      t.string :doctor
      t.string :appointment
      t.date :date
      t.time :time
      t.string :note

      t.timestamps
    end
  end
end
