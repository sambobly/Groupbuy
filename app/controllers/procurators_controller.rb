class ProcuratorsController < InheritedResources::Base

  respond_to :json

  protected
  def begin_of_association_chain
    if params[:invoice_id]
      invoice = Invoice.find(params[:invoice_id])
    else
      nil
    end
  end

  private

    def procurator_params
      params.require(:procurator).permit(:name, :invoice_id)
    end
end




