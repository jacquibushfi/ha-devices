class RpdeviceSerializer < ActiveModel::Serializer
  attributes :id, :hostname, :ipadd, :location_id
end
