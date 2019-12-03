class Bird < ActiveRecord::Base

  attr_accessible :name, :nest_id, :id, :photo, :latitude, :longitude
  belongs_to :nest
  validates :name, presence: true
  mount_uploader :photo, PhotoUploader

  require 'exifr/jpeg'

  # def initialize(params = {})
  #   @photo = Photo
  #   @id = Id
  #   @params = params
  # end
  #
  # def params
  #   @params
  # end

  def self_options
    photo_url = self.photo_url
  end

  before_save :extract_geolocation
  def extract_geolocation
    # byebug
    @bird = self
    # @bird = Bird.find(params[:id])
    # EXIFR::JPEG.new('enkhuizen.jpg').gps.longitude
    # self.latitude = EXIFR::JPEG.new('public/' + self.photo_url).gps.latitude
    # EXIFR::JPEG.new('public/uploads/bird/photo/1/IMG_6426.jpg').gps.latitude
    # self.update(:latitude => EXIFR::JPEG.new('public/' + self.photo_url).gps.latitude )
    self.latitude = EXIFR::JPEG.new('public/' + self.photo_url).gps.latitude
    self.longitude = EXIFR::JPEG.new('public/' + self.photo_url).gps.longitude

    p "byebug"
  # byebug
  p "byebug continued"
  end

    # validates :nest_id, presence: true
end
