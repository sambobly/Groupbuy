class DoctorsController < ApplicationController
  before_action :set_doctor, only: [:show, :edit, :update, :destroy, :index, :new, :create, :all]

  # GET /doctors
  # GET /doctors.json
  def index
    @doctors = Doctor.find(:all)

  end

  def all
    @doctors = Doctor.all
    respond_to do |format|
      format.html # index.html
      format.json { render json: @doctors}
    end
  end
  # GET /doctors/1
  # GET /doctors/1.json
  def show
    @doctor = Doctor.find(params[:id])
    respond_to do |format|
      format.html # index.html
      format.json { render json: @doctors}
    end
  end

  # GET /doctors/new
  def new
    @doctor = Doctor.new
    @doctors = Doctor.all.by_name
    @all_patients = Patient.all

  end

  # GET /doctors/1/edit
  def edit
    @doctors = Doctor.all.by_name
  end

  # POST /doctors
  # POST /doctors.json
  def create
    @doctors = Doctor.all.by_name
    @doctor = Doctor.new(doctor_params)
    respond_to do |format|
      if @doctor.save
        format.html { redirect_to @doctor, notice: 'Doctor was successfully created.' }
        format.json { render action: 'show', status: :created, location: @doctor }
      else
        format.html { render action: 'new' }
        format.json { render json: @doctor.errors, status: :unprocessable_entity }
      end
    end
  end

  def search
    @doctors = Doctor.where("first_name like ? or last_name like ?", "%#{params[:term]}%", "%#{params[:term]}%").order(:first_name)

    respond_to do |format|
      format.html { render "search.json.erb" }
    end
  end
  
  # GET /doctors/list.json
  def list
      @doctors = params["doctor_ids"].nil? ? Doctor.order( :first_name ) : Doctor.where(id: params["doctor_ids"]).order( :first_name )

      render json: @doctors
  end
  
  # PATCH/PUT /doctors/1
  # PATCH/PUT /doctors/1.json
  def update
    respond_to do |format|
      if @doctor.update(doctor_params)
        format.html { redirect_to @doctor, notice: 'Doctor was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @doctor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /doctors/1
  # DELETE /doctors/1.json
  def destroy
    @doctor.destroy
    respond_to do |format|
      format.html { redirect_to doctors_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_doctor
      @doctor = Doctor.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def doctor_params
      params.require(:doctor).permit(:first_name, :last_name, :position)
    end
  
end
