class AddDoctorIdToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :doctor_id, :integer
    remove_column :appointments, :doctor
  end
end
