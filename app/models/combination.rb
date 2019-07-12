class Combination < ActiveRecord::Base
  self.table_name = "combinations"
  attr_accessible :combination_id,:onea, :oneb, :twoa, :twob, :threea, :threeb, :foura, :fourb, :fivea, :fiveb, :sixa, :sixb, :sevena, :sevenb, :eighta, :eightb, :ninea, :nineb, :tena, :tenb, :result, :complete, :created_at, :updated_at



end
