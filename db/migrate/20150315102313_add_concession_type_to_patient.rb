class AddConcessionTypeToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :concession_type, :text
  end
end
