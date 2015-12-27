class PatientsController < InheritedResources::Base
  respond_to :json

  #protected
  #def begin_of_association_chain
  #  egg = Egg.find(params[:egg_id])
  #end
  #def show
  #  @nest = Nest.find(params[:id])
  #  @eggs = @nest.eggs
  #end



  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :email, :title, :UR_number, :date_of_birth, :gender, {:concession_type => [:name, :id, :percentage, :url]}, :address, :emergency_contact, :medicare_number, :referral_type, :referring_doctor, :phone_number)
  end
end
#
#  respond_to :json
#
#  private
#
#  def patient_params
#    params.require(:patient).permit(:first_name, :last_name, :email, :title, :UR_number, :date_of_birth, :gender, :id, {:concession_type => [:name, :id, :percentage, :url]}, :address, :emergency_contact, :medicare_number, :referral_type, :referring_doctor, :phone_number)
#  end
#end



#class PatientsController < ApplicationController
#  before_action :set_patient, only: [:show, :edit, :update, :destroy, :create]
#  respond_to :json
## has_many :line_items #attempting to create checkin
#  # GET /patients
#  # GET /patients.json
#  def index
#    @patients = Patient.all
#    render json: @patients
#  end
#
#  # GET /patients/1
#  # GET /patients/1.json
#  def show
#    respond_with Patient.all
#  end
#
#  # GET /patients/new
#  def new
#    @patient = Patient.new
#  end
#
#  # GET /patients/1/edit
#  def edit
#
#  end
#
#  # POST /patients
#  # POST /patients.json
#  def create
#    # Create and save new patient from data received from the client
#    new_patient = Patient.new
#    new_patient.first_name = params[:patient][:first_name]
#    new_patient.last_name = params[:patient][:last_name]
#    new_patient.email = params[:patient][:email]
#    new_patient.title = params[:patient][:title]
#    new_patient.date_of_birth = params[:patient][:date_of_birth]
#    new_patient.gender = params[:patient][:gender]
#    new_patient.concession_type = params[:patient][:concession_type]
#    new_patient.address = params[:patient][:address]
#    new_patient.emergency_contact = params[:patient][:emergency_contact]
#    new_patient.medicare_number = params[:patient][:medicare_number]
#    new_patient.referral_type = params[:patient][:referral_type]
#    new_patient.phone_number = params[:patient][:phone_number]
#    new_patient.referring_doctor = params[:patient][:referring_doctor]
#
#
#
#
#
#
#    # Confirm patient is valid and save or return HTTP error
#    if new_patient.save
#      render json: new_patient
#    else
#      render json: { errors: new_patient.errors.full_messages }, status: 500
#    end
#
#  end
#    #@patient = Patient.new(patient_params)
#
#   # respond_to do |format|
#   #   if @patient.save
#   #     format.html { redirect_to @patient, notice: 'Patient was successfully created.' }
#    #    format.json { render action: 'show', status: :created, location: @patient }
#    #  else
#    #    format.html { render action: 'new' }
#    #    format.json { render json: @patient.errors, status: :unprocessable_entity }
#   #   end
#   # end
#  #end
#
#  # PATCH/PUT /patients/1
#  # PATCH/PUT /patients/1.json
#  def update
#    respond_to do |format|
#      if @patient.update(patient_params)
#        format.html { redirect_to @patient, notice: 'Patient was successfully updated.' }
#        format.json { head :no_content }
#      else
#        format.html { render action: 'edit' }
#        format.json { render json: @patient.errors, status: :unprocessable_entity }
#      end
#    end
#  end
#
#  # DELETE /patients/1
#  # DELETE /patients/1.json
#  def destroy
#    @patient.destroy
#    respond_to do |format|
#      format.html { redirect_to patients_url }
#      format.json { head :no_content }
#    end
#  end
#
#  private
#    # Use callbacks to share common setup or constraints between actions.
#    def set_patient
#      @patient = Patient.find_by_id(params[:id])
#    end
#
#    # Never trust parameters from the scary internet, only allow the white list through.
#    def patient_params
#      params.require(:patient).permit(:name, :UR_number, :id, :first_name, :last_name)
#    end
#
#    def ensure_not_referenced_by_any_line_item
#      if line_items.empty?
#        return true
#      else
#        errors.add(:base, 'Line Items Present')
#        return false
#
#      end
#    end
#end
