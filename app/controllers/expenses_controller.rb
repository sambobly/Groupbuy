class ExpensesController < InheritedResources::Base


#class ExpensesController < ApplicationController
#  before_action :set_expense, only: [:show, :edit, :update, :destroy, :create]

  respond_to :json
  #def index
  #  @expenses = Expense.all
  #  render json: @expenses
  #end
  #
  #def create
  #  # Create and save new patient from data received from the client
  #  new_expense = Expense.new
  #  new_expense.date = params[:expense][:date]
  #  new_expense.vendor = params[:expense][:vendor]
  #  new_expense.category = params[:expense][:category]
  #  new_expense.amount = params[:expense][:amount]
  #  new_expense.tax = params[:expense][:tax]
  #  new_expense.taxamount = params[:expense][:taxamount]
  #  new_expense.note = params[:expense][:note]
  #  new_expense.note = params[:expense][:product]
  #
  #  if new_expense.save
  #    render json: new_expense
  #  else
  #    render json: { errors: new_expense.errors.full_messages }, status: 500
  #  end
  # end

  private
  #def set_expense
  #  @expense = Expense.find_by_id(params[:id])
  #end

    def expense_params
      params.require(:expense).permit(:date, :vendor, :category, :amount, {:tax => [:name, :id, :amount, :url]}, :taxamount, :note, :product, :test, {:concession_type => [:name, :id, :percentage, :url]});
    end
end

