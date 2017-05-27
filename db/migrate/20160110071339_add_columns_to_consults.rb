class AddColumnsToConsults < ActiveRecord::Migration
  def change
    add_reference :consults, :patient, index: true
    add_reference :consults, :doctor, index: true
    add_reference :consults, :appointment, index: true
  end
end
