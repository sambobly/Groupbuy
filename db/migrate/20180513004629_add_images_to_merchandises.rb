class AddImagesToMerchandises < ActiveRecord::Migration
  def change
    add_column :merchandises, :images, :string
  end
end
