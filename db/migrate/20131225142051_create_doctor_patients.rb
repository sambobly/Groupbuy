class CreateDoctorPatients < ActiveRecord::Migration
  def change
    create_table :doctors_patients do |t|
      t.belongs_to :doctor
      t.belongs_to :patient
    end
  end
end
