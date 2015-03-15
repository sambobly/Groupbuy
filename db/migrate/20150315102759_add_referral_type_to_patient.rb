class AddReferralTypeToPatient < ActiveRecord::Migration
  def change
    add_column :patients, :referral_type, :text
  end
end
