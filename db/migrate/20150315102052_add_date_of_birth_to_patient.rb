class AddDateOfBirthToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :date_of_birth, :date
  end
end
