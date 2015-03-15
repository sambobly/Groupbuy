class AddEmergencyContactToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :emergency_contact, :text
  end
end
