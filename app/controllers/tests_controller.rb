class TestsController < InheritedResources::Base

  respond_to :json

  private

    def test_params
      params.require(:test).permit(:name, {:concession_type => [:name, :id, :percentage, :url]})
    end
end

