class ConsultsController < InheritedResources::Base

  respond_to :json

  private

    def consult_params
      params.require(:consult).permit(:patient, :doctor, :appointment, :date, :time, :note)
    end
end

