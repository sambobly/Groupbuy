class ModelMailer < ActionMailer::Base
  add_template_helper(EmailsHelper)
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
  #def claim_email(consumer)
  #  @consumer = consumer
  #  mail(to: @consumer.email, subject: 'Sample Email')
  #end
  def claim_email(consumer, merchandise)
    @consumer = consumer
    @merchandise = merchandise
    mail(to: @consumer.email, subject: 'Did you win??', template_path: 'model_mailer',
         template_name: 'claim_email')
  end
  def fail_email(consumer, merchandise)
    @consumer = consumer
    @merchandise = merchandise
    mail(to: @consumer.email, subject: 'Did you win?', template_path: 'model_mailer',
         template_name: 'fail_email')
  end
  def complete_email(claim)
    @claim = claim
    mail(to: @claim.email, subject: 'Confirmation1')
  end

  def answer_email(consumer, merchandise)
    @consumer = consumer
    @merchandise = merchandise
    mail(to: @consumer.email, subject: 'Submit your answers!')
  end
  end
