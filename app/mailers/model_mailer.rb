class ModelMailer < ActionMailer::Base
  default from: "from@sambobly1@gmail.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.model_mailer.new_record_notification.subject
  #

  def model_email(patient)
    @patient = patient
    mail(to: @patient.email, subject: 'Sample Email')
  end
  #def new_record_notification(patient)
  #  @patient = patient
  #  mail(to: @patient.email, subject: 'Sample Email')
  #end
  def new_record_notification(patient)
    @patient = patient
    mail(to: 'regreginald32@gmail.com', subject: 'Sample Email')
  end
  def letter_email(letter, patient)
    @letter = letter
    @patient = patient
    mail(to: @letter.email, subject: @letter.subject)
  end
  def test_email(consumer)
    @consumer = consumer
    mail(to: @consumer.email)
  end
end
