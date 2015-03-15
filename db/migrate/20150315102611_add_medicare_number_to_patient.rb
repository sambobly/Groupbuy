class AddMedicareNumberToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :medicare_number, :decimal
  end
end
