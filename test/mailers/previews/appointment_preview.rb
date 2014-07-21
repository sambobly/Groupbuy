# Preview all emails at http://localhost:3000/rails/mailers/appointment
class AppointmentPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/appointment/booked
  def booked
    Appointment.booked
  end

  # Preview this email at http://localhost:3000/rails/mailers/appointment/missed
  def missed
    Appointment.missed
  end

end
