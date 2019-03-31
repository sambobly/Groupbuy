class TaxesController < InheritedResources::Base
 respond_to :json
 protected
 private

def tax_params
  params.require(:tax).permit(:name, :amount)
end

 #def show
 #  ModelMailer.new_record_notification(@tax).deliver
 #  end
end

