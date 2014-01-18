class AppointmentsController < ApplicationController

  def index
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
    @appointment = Appointment.new( params.require( :appointment ).permit( :name, :patient_name, :start_time ) )
    if @appointment.save
      redirect_to new_appointment_path
    else
      render 'new'
    end
  end

  def find
    @appointments = Appointment.search(params[:search])
  end
  
  def findByDate
    start_time = params.require( :start ) # paramater expected as unix time
    end_time = params.require( :end ) # expected as unix time
    # TODO: validate date paramater
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
    doctor = params.require( :doctor )
    start_time = params.require (:start)
    @appointment = Appointment.find(params.require(:doctor).must_be_nil(:start))
  end

end
