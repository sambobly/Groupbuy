#module Api
class EggsController < InheritedResources::Base

  respond_to :json
  #def index
  #end

  protected
  def begin_of_association_chain
    if params[:nest_id]
      nest = Nest.find(params[:nest_id])
    else
      nil
    end
  end

  private

    def egg_params
      params.require(:egg).permit(:name, :nest_id, :content)
    end
end
  #end

