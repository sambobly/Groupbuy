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
    @appointment = Appointment.new( params.require( :appointment ).permit( :name, :patient_name ) )
    @appointment.save
    @appointment = Appointment.create(params[:appointments])
    if @appointment.save
      redirect_to new_appointment_path
    else
      err = ''
      @appointment.errors.full_messages.each do |m|
        err << m
      end
      redirect_to new_appointment_path, :flash => { :alert => "#{err}, please try again" }
    end
  end

  def find
    @appointments = Appointment.search(params[:search])
  end
  
  def findByDate
    start_time = params.require( :start ) # paramater expected as unix time
    end_time = params.require( :end ) # expected as unix time
    # TODO: validate date paramater
    #validates_uniqueness_of :appointment.start_time (note that start_time includes the date)
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
end
