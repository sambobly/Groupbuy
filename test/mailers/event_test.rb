require 'test_helper'

class EventTest < ActionMailer::TestCase
  test "booked" do
    mail = EventMailer.booked
    assert_equal "Booked", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "missed" do
    mail = EventMailer.missed
    assert_equal "Missed", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
