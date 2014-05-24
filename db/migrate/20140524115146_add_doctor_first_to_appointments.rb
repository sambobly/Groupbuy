class AddDoctorFirstToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :doctor_first, :string
  end
end
