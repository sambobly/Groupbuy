class Event < ActionMailer::Base
  default from: "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.event.booked.subject
  #
  def booked
    @greeting = "Hi"

    mail to: "to@example.org"
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
end
