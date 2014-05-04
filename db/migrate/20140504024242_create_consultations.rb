class CreateConsultations < ActiveRecord::Migration
  def change
    create_table :consultations do |t|
      t.integer :patient_id
      t.integer :doctor_id
      t.datetime :time

      t.timestamps
    end
  end
end
