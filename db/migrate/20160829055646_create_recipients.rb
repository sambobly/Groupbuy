class CreateRecipients < ActiveRecord::Migration
  def change
    create_table :recipients do |t|
      t.references :letter, index: true
      t.text :email
      t.text :name
      t.text :first_name
      t.text :last_name
      t.text :type

      t.timestamps
    end
  end
end
