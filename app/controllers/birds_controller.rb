class BirdsController < InheritedResources::Base

  respond_to :json


  private

  def bird_params
    params.require(:bird).permit(:name, :nest_id)
  end
end

