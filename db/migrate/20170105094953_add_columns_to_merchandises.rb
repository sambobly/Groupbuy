class AddColumnsToMerchandises < ActiveRecord::Migration
  def change
    add_column :merchandises, :category, :string
    add_column :merchandises, :bid, :decimal
    add_column :merchandises, :difference, :decimal
    add_column :merchandises, :consumer_name, :string
    add_column :merchandises, :complete, :boolean
    add_column :merchandises, :email, :boolean
    add_column :merchandises, :received, :boolean
    add_column :merchandises, :paid, :boolean
  end
end
