class TemplatesController < InheritedResources::Base

    respond_to :json

  private

    def template_params
      params.require(:template).permit(:name, :content)
    end
end

