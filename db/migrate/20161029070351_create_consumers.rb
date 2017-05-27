class CreateConsumers < ActiveRecord::Migration
  def change
    create_table :consumers do |t|
      t.string :name
      t.string :first_name
      t.string :last_name
      t.string :date_of_birth
      t.references :payment_method, index: true
      t.string :public
      t.string :gender
      t.string :pronoun
      t.string :email
      t.string :number
      t.string :password

      t.timestamps
    end
  end
end
