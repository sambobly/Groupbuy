# Preview all emails at http://localhost:3000/rails/mailers/event
class EventPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/event/booked
  def booked
    EventMailer.booked
  end

  # Preview this email at http://localhost:3000/rails/mailers/event/missed
  def missed
    EventMailer.missed
  end

end
