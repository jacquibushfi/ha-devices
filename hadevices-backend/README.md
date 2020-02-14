Javascript SPA with Rails Backend Project.

Home Assistant Devices App.

Welcome to this Javascript SPA project where you can view your Home Assistant devices.  You can create a location for the device, add devices to locations, and remove devices.

This project will create a folder named "ha-devices".  Inside of this folder, you will find the frontend (hadevices-frontend) and backend (hadevices-backend) folders.  

Installation: $ cd hadevices-backend
              $ bundle install 
              $ rails db:migrate
              $ rails db:seed
              $ rails s
              Open the Index.html file in your browser and the application will begin.

CORS, a security feature,  has been included in the gemfile and setup in config/initializers/cors.rb.  Details on CORS can be found here  https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS .

To view the JSON document in a formatted version instead of plain text in Chrome, install the JSON Viewer as an extension.

Contributing Bug reports and pull requests are welcome on GitHub at https://github.com/jacquibushfi/courses. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the Contributor Covenant code of conduct.

License The project is available as open source under the terms of the MIT License.