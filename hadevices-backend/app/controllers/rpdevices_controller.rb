class RpdevicesController < ApplicationController
  before_action :set_rpdevice, only: [:show, :update, :destroy]

  # GET /rpdevices
  def index
    rpdevices = Rpdevice.all

    render json: rpdevices
  end

  # GET /rpdevices/1
  def show
    render json: rpdevice
  end

  # POST /rpdevices
  def create
    rpdevice = Rpdevice.new(rpdevice_params)

    if rpdevice.save
      render json: rpdevice, status: :created, location: rpdevice
    else
      render json: rpdevice.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /rpdevices/1
  def update
    if rpdevice.update(rpdevice_params)
      render json: rpdevice
    else
      render json: rpdevice.errors, status: :unprocessable_entity
    end
  end

  # DELETE /rpdevices/1
  def destroy
    rpdevice.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_rpdevice
      rpdevice = Rpdevice.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def rpdevice_params
      params.require(:rpdevice).permit(:hostname, :ipadd, :location_id)
    end
end
