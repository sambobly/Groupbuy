class AppointmentsController < ApplicationController
  
  def index
    @latest_appointment = Appointment.last
  end
  
  # Creates a new appointment
  def new
    @appointment = Appointment.new
  end
  
  def create
    @appointment = Appointment.new( params.require( :appointment ).permit( :name, :patient_name ) )
    @appointment.save
  end
  
end
