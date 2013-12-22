class AppointmentsController < ApplicationController

  def index
    @latest_appointment = Appointment.last
    @appointments = Appointment.search(params[:search])
    @hour = Appointment.uniq
    date_from_ajax = params[:matched_date]
    reduce = Appointment.where(:date => date_from_ajax)
    hour_on_date = reduce.collect {|x| x.hour}
    @new_dates = hour_on_date
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

  end
