class CombinationsController < InheritedResources::Base

  private

    def combination_params
      params.require(:combination).permit(:onea, :oneb, :twoa, :twob, :threea, :threeb, :foura, :fourb, :fivea, :fiveb, :sixa, :sixb, :sevena, :sevenb, :eighta, :eightb, :ninea, :nineb, :tena, :tenb, :result, :complete)
    end
end

