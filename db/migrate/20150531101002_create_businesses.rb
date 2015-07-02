class CreateBusinesses < ActiveRecord::Migration
  def change
    create_table :businesses do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.integer :postcode
      t.string :country
      t.string :registrationname
      t.integer :registrationnumber
      t.string :website
      t.string :contact
      t.boolean :online

      t.timestamps
    end
  end
end
