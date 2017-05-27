class SticksController < InheritedResources::Base
  respond_to :json

  private

  def stick_params
    params.require(:stick).permit(:name, :nest_id)
  end
end

