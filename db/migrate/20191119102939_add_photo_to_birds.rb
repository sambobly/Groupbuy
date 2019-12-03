class AddPhotoToBirds < ActiveRecord::Migration
  def change
    add_column :birds, :photo, :string
    add_column :birds, :latitude, :string
    add_column :birds, :longitude, :string
  end
end
