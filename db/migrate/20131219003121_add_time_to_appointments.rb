class AddTimeToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :appointment_time, :time
  end
end
