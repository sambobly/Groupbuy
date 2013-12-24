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
    start_time = params.require( :start ) # paramter expected as unix time
    end_time = params.require( :end ) # expected as unix time
    # TODO: validate date paramter
    @appointments = Appointment.where( 'start_time BETWEEN FROM_UNIXTIME( ? ) AND FROM_UNIXTIME( ? )', start_time, end_time )
    render json: @appointments
  end
end
