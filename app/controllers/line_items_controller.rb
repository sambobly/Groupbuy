class LineItemsController < ApplicationController
  before_action :set_line_item, only: [:show, :edit, :update, :destroy]

  # GET /line_items
  # GET /line_items.json
  def index
    @line_items = LineItem.all
  end

  # GET /line_items/1
  # GET /line_items/1.json
  def show
  end

  # GET /line_items/new
  def new
    @line_item = LineItem.new
  end

  # GET /line_items/1/edit
  def edit
  end

  # POST /line_items
  # POST /line_items.json
  def create
    # TODO We should check to see if we need to create a new checkin (e.g. if the date of the latest check in is earlier than today's date)
    debugger
    @checkin = Checkin.order( "created_at DESC").first
    appointment = Appointment.find(params[:appointment_id])
    @line_item = @checkin.line_items.build(:appointment_id => appointment.id)

    respond_to do |format|
      if @line_item.save
        format.html { redirect_to appointments_url}
        format.json { render action: 'show', status: :created, location: @line_item }
      else
        format.html { render action: 'new' }
        format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /line_items/1
  # PATCH/PUT /line_items/1.json
  def update
    respond_to do |format|
      if @line_item.update(line_item_params)
        format.html { redirect_to @line_item, notice: 'Line item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @line_item.errors, status: :unprocessable_entity }
      end
    end
  end
  
  # Checks a patient out
  def checkout
    @line_item = LineItem.find(params[:id])
    @line_item.checked_in = false
    @line_item.check_out_time = Time.now
    @line_item.save
    
    # Redirect back to where the request came from
    # TODO update so this is called via ajax
    redirect_to( request.referer )
  end

  # DELETE /line_items/1
  # DELETE /line_items/1.json
  def destroy
    @line_item = LineItem.find(params[:id])
    @line_item.destroy
    respond_to do |format|
      format.html { redirect_to line_items_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_line_item
      @line_item = LineItem.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def line_item_params
      params.require(:line_item).permit(:appointment_id, :checkin_id)
    end
end
