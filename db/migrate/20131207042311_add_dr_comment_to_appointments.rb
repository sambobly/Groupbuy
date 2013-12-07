class AddDrCommentToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :dr_comment, :string
  end
end
