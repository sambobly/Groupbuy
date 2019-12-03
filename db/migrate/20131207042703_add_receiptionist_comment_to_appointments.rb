class AddReceiptionistCommentToAppointments < ActiveRecord::Migration
  def change
    add_column :appointments, :receptionist_comment, :text
  end
end
