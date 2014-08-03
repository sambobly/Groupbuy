class EventMailer < ActionMailer::Base
  default from: "Sambobly1@gmail.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.event.booked.subject
  #
  def booked(appointment)
    @appointment = appointment
    @patient = @appointment.patient
   # attachments["rails.png"] = File.read("#{Rails.root}/public/images/rails.png")
    mail(to: appointment.patient.email, subject: "Appointment Booked")
  end
end


  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.event.missed.subject
  #
  def missed
    @greeting = "Hi"

    mail to: "to@example.org"
  end

