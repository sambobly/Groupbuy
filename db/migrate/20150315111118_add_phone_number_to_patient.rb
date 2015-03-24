class AddPhoneNumberToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :phone_number, :integer
  end
end
