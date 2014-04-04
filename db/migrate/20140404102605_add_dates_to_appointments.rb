class AddDatesToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :start_date, :date
    add_column :appointments, :end_date, :date
  end

  def up
    change_column :appointments, :start_time, :time
    change_column :appointments, :end_time, :time
  end

  def down
    change_column :appointments, :start_time, :datetime
    change_column :appointments, :end_time, :datetime
  end
end
