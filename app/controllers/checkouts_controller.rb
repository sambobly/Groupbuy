class CheckoutsController < InheritedResources::Base
  before_action :set_checkout, only: [:show, :edit, :update, :destroy]
  #attempting to create checkout, much like a product cart
  # GET /checkouts
  # GET /checkouts.json
  def index
    @checkouts = Checkout.all
  end


  # GET /checkouts/1
  # GET /checkouts/1.json
  def show
    begin
      @checkout = Checkout.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      logger.error "Attempt to access invalid checkout #{params[:id]}"
      redirect_to index_appointment_url, notice: 'Invalid Checkout'
    else
      respond_to do |format|
        format.html #show.html.erb
        format.json {render json: @checkout}
      end
    end
  end

  # GET /checkouts/new
  def new
    @checkout= Checkout.new
  end

  # GET /checkouts/1/edit
  def edit
  end

  # POST /checkouts
  # POST /checkouts.json
  def create
    @checkout = Checkout.new(checkout_params)

    respond_to do |format|
      if @checkout.save
        format.html { redirect_to @checkout, notice: 'checkout was successfully created.' }
        format.json { render action: 'show', status: :created, location: @checkout }
      else
        format.html { render action: 'new' }
        format.json { render json: @checkout.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /checkouts/1
  # PATCH/PUT /checkouts/1.json
  def update
    respond_to do |format|
      if @checkout.update(checkout_params)
        format.html { redirect_to @checkout, notice: 'checkout was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @checkout.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /checkouts/1
  # DELETE /checkouts/1.json
  def destroy
    @checkout = current_checkout
     @checkout.destroy
      session[:checkout_id] = nil
      respond_to do |format|
        format.html { redirect_to checkouts_url }
        format.json { head :no_content }

    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_checkout
    @checkout = checkout.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def checkout_params
    params[:checkout]
  end
  end



