class NestsController < InheritedResources::Base

  respond_to :json

  #protected
  #def begin_of_association_chain
  #  egg = Egg.find(params[:egg_id])
  #end
  #def show
  #  @nest = Nest.find(params[:id])
  #  @eggs = @nest.eggs
  #end



  private

    def nest_params
      params.require(:nest).permit(:name)
    end
end

