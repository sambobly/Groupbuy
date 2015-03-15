class AddPatientTitleToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :patient_title, :text
  end
end
