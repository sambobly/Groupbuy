class Procurator < ActiveRecord::Base
  attr_accessible :name, :invoice_id

  belongs_to :invoice
end
