class EventMailer < ActionMailer::Base
  default from: "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.event.booked.subject
  #
  def booked(patient)
    @patient = patient
    attachments["rails.png"] = File.read("#{Rails.root}/public/images/rails.png")
    mail(:to => "#{patient.name} <#{patient.email}>", :subject => "Booked")
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

