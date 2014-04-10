class AddDoctorNameToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :doctor_name, :string
  end
end
