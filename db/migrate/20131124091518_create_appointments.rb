class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.string :name
      t.date :date
      t.string :patient_name
      t.string :doctor

      t.timestamps
    end
  end
end
