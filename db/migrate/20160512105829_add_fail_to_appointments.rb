class AddFailToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :fail, :boolean
  end
end
