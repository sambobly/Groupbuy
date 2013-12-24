require 'test_helper'

class AppointmentsControllerTest < ActionController::TestCase
  # test "the truth" do
  #   assert true
  # end

  test "should get findByDate" do
    start_time = Date.parse( '2007-11-30' ).to_time.to_i
    end_time = Date.parse( '2007-12-01' ).to_time.to_i
    get :findByDate, start: start_time, end: end_time
    assert_response :success
    @appointments = JSON.parse(@response.body)
    assert(@appointments.count >= 1, "could not find appointments by date")
  end
end
