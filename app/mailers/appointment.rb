class Appointment < ActionMailer::Base
  default from: "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.appointment.booked.subject
  #
  def booked
    @patient = patient

    mail to: appointment.email, subject: 'Appointment booked'
  end

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.appointment.missed.subject
  #
  def missed
    @greeting = "Hi"

    mail to: "to@example.org"
  end
end
