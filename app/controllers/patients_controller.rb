class PatientsController < ApplicationController
  before_action :set_patient, only: [:show, :edit, :update, :destroy, :create]
  respond_to :json
 # has_many :line_items #attempting to create checkin
  # GET /patients
  # GET /patients.json
  def index
    @patients = Patient.all
    render json: @patients
  end

  # GET /patients/1
  # GET /patients/1.json
  def show
    respond_with Patient.all
  end

  # GET /patients/new
  def new
    @patient = Patient.new
  end

  # GET /patients/1/edit
  def edit
  end

  # POST /patients
  # POST /patients.json
  def create
    # Create and save new patient from data received from the client
    new_patient = Patient.new
    new_patient.first_name = params[:new_patient][:first_name]
    new_patient.last_name = params[:new_patient][:last_name]

    # Confirm patient is valid and save or return HTTP error
    if new_patient.valid?
      new_patient.save!
      render "/patients"
    else
      render "/patients", :status => 422
      return
    end

    # Respond with newly created patient in json format
    respond_with(new_patient) do |format|
      format.json { render :json => new_patient.as_json }
    end

  end
    #@patient = Patient.new(patient_params)

   # respond_to do |format|
   #   if @patient.save
   #     format.html { redirect_to @patient, notice: 'Patient was successfully created.' }
    #    format.json { render action: 'show', status: :created, location: @patient }
    #  else
    #    format.html { render action: 'new' }
    #    format.json { render json: @patient.errors, status: :unprocessable_entity }
   #   end
   # end
  #end

  # PATCH/PUT /patients/1
  # PATCH/PUT /patients/1.json
  def update
    respond_to do |format|
      if @patient.update(patient_params)
        format.html { redirect_to @patient, notice: 'Patient was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @patient.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /patients/1
  # DELETE /patients/1.json
  def destroy
    @patient.destroy
    respond_to do |format|
      format.html { redirect_to patients_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_patient
      @patient = Patient.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def patient_params
      params.require(:patient).permit(:name, :UR_number, :id, :first_name, :last_name)
    end

    def ensure_not_referenced_by_any_line_item
      if line_items.empty?
        return true
      else
        errors.add(:base, 'Line Items Present')
        return false

      end
    end
end
