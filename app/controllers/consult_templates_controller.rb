class ConsultTemplatesController < InheritedResources::Base
  #before_action :set_consult_template, only: [:show, :edit, :update, :destroy, :create]

  respond_to :json
  private

    def consult_template_params
      params.require(:consult_template).permit(:name, :content)
    end
end

