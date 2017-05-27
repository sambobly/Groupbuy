class Nest < ActiveRecord::Base

    attr_accessible :name, :id
    has_many :eggs
    has_many :birds
    accepts_nested_attributes_for :eggs
    accepts_nested_attributes_for :birds


end
