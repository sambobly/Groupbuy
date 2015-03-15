class FixPatientTitle < ActiveRecord::Migration
  def change
    rename_column :patients, :patient_title, :title
  end
end
