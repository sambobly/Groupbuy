class CreateMeetings < ActiveRecord::Migration
  def change
    create_table :meetings do |t|
      t.references :doctor, index: true
      t.references :patient, index: true
      t.references :appointment, index: true
      t.text :content
      t.date :date
      t.time :time

      t.timestamps
    end
  end
end
