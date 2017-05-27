class CreateEmails < ActiveRecord::Migration
  def change
    create_table :emails do |t|
      t.string :subject
      t.string :content
      t.references :patient, index: true
      t.references :doctor, index: true

      t.timestamps
    end
  end
end
