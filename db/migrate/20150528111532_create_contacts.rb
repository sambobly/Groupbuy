class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :firstname
      t.string :lastname
      t.integer :phone
      t.string :occupation
      t.string :company
      t.string :email
      t.string :address
      t.string :city
      t.string :state
      t.integer :postcode
      t.string :note

      t.timestamps
    end
  end
end
