class AddReferringDoctorToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :referring_doctor, :text
  end
end
