class ConsultTemplatesController < InheritedResources::Base

  private

    def consult_template_params
      params.require(:consult_template).permit(:name, :content)
    end
end

