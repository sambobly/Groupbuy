class CreateLineItems < ActiveRecord::Migration
  def change
    create_table :line_items do |t|
      t.integer :patient_id
      t.integer :checkin_id

      t.timestamps
    end
  end
end
