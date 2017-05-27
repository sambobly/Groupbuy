class AddAttendedToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :attended, :boolean
  end
end
