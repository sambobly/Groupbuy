class ExpensesController < InheritedResources::Base

  respond_to :json

  private

    def expense_params
      params.require(:expense).permit(:date, :vendor, :category, :amount, :tax, :taxamount, :note, :product)
    end
end

