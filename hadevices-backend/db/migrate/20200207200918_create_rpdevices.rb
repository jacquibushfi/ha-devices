class CreateRpdevices < ActiveRecord::Migration[6.0]
  def change
    create_table :rpdevices do |t|
      t.string :hostname
      t.string :ipadd
      t.integer :location_id

      t.timestamps
    end
  end
end
