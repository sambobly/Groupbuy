class AddDoctorLastToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :doctor_last, :string
  end
end
