class AppointmentsController < ApplicationController
  before_filter :set_search

  def set_search
    @search=Appointment.search(params[:q])
  end

  def index
    @q = Appointment.search(params[:q])
    @appointments = @q.result(distinct: true).limit(5)
    @checkin = current_checkin
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
    @appointment = Appointment.create( params.require( :appointment ).permit( :name, :patient_name, :start_time, :end_time, :doctor_id, :end_date, :start_date, :doctor_name ) )
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
    # TODO: handle invalid datetime parameters gracefully - currently expects unix time
    start_datetime = DateTime.strptime( params.require( :start ), "%s" ) # paramater expected as unix time
    end_datetime = DateTime.strptime( params.require( :end ), "%s" ) # expected as unix time
     #TODO: validate date paramater
    @appointments = Appointment.where( 'TIMESTAMP(start_date, start_time) >= ? AND TIMESTAMP(end_date, end_time) <= ?', start_datetime, end_datetime )
    render json: @appointments.collect {|appointment| {
      id: appointment.id,
      start: DateTime.new(appointment.start_date.year, appointment.start_date.month, appointment.start_date.day, appointment.start_time.hour, appointment.start_time.min),
      end: DateTime.new(appointment.end_date.year, appointment.end_date.month, appointment.end_date.day, appointment.end_time.hour, appointment.end_time.min),
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

  def createwidget
    @content = render_to_string(:partial => 'widget/createwidget_widget')
    render :layout => false
  end
end
