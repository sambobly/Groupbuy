class CreateAccounts < ActiveRecord::Migration
  def change
    create_table :accounts do |t|
      t.string :companyname
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :country

      t.timestamps
    end
  end
end
