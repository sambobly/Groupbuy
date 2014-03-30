class AppointmentsController < ApplicationController
  before_filter :set_search

  def set_search
    @search=Appointment.search(params[:q])
  end

  def index
    @q = Appointment.search(params[:q])
    @appointments = @q.result(distinct: true).limit(5)
  end
  # Creates a new appointment
  def new
    @appointment = Appointment.new
    @appointments = Appointment.create
    respond_to do |format|
      format.html
      format.js
    end
  end

  def create
    @appointment = Appointment.create( params.require( :appointment ).permit( :name, :patient_name, :start_time, :end_time, :doctor_id ) )
    if @appointment.save
        redirect_to new_appointment_path
    else
      render 'new'
    end
  end

  def find
    search = params[:search]
    @appointments = Appointment.joins(:patient).joins(:doctor).where( "CONCAT(doctors.first_name, ' ', doctors.last_name) LIKE '%#{search}%' OR CONCAT(patients.first_name, ' ', patients.last_name) LIKE '%#{search}%'")
  end
  
  def findByDate
    start_time = params.require( :start ) # paramater expected as unix time
    end_time = params.require( :end ) # expected as unix time
     #TODO: validate date paramater
    @appointments = Appointment.where( 'start_time BETWEEN FROM_UNIXTIME( ? ) AND FROM_UNIXTIME( ? )', start_time, end_time )
    render json: @appointments.collect {|appointment| {
      id: appointment.id,
      start: appointment.start_time,
      end: appointment.end_time,
      title: appointment.patient.first_name + " " + appointment.patient.last_name,
      doctor_id: appointment.doctor_id,
      allDay: false
    }}
  end

  def findNextAvailableSlot
    doctor = params.require(:doctor.name)
    start_time = params.require (:start)
    DateTime.date
    @appointment = Appointment.search(params.require(:doctor.name))
  end

end
