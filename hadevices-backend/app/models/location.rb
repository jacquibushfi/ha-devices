class Location < ApplicationRecord
  has_many :rpdevices, dependent: :destroy
end
