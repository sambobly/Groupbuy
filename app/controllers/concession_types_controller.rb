class ConcessionTypesController < InheritedResources::Base

  respond_to :json

  private

    def concession_type_params
      params.require(:concession_type).permit(:name, :percentage)
    end
end

