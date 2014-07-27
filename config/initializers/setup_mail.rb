ActionMailer::Base.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :domain               => "Sambobly1@gmail.com",
    :user_name            => "Sambobly1",
    :password             => "asdfjkl123",
    :authentication       => "plain",
    :enable_starttls_auto => true
}