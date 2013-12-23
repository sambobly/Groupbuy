require 'test_helper'

class DoctorsControllerTest < ActionController::TestCase
  setup do
    @doctor = doctors(:tom)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:doctors)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create doctor" do
    assert_difference('Doctor.count') do
      post :create, doctor: { first_name: @doctor.first_name, last_name: @doctor.last_name, position: @doctor.position }
    end

    assert_redirected_to doctor_path(assigns(:doctor))
  end

  test "should show doctor" do
    get :show, id: @doctor
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @doctor
    assert_response :success
  end

  test "should update doctor" do
    patch :update, id: @doctor, doctor: { first_name: @doctor.first_name, last_name: @doctor.last_name, position: @doctor.position }
    assert_redirected_to doctor_path(assigns(:doctor))
  end

  test "should destroy doctor" do
    assert_difference('Doctor.count', -1) do
      delete :destroy, id: @doctor
    end

    assert_redirected_to doctors_path
  end
  
  test "should show list" do
    get :list
    assert_response :success
    doctors = JSON.parse(@response.body)
    assert_equal doctors.count, 3
    assert_equal doctors[ 0 ][ "first_name" ], "Theo"
    assert_equal doctors[ 1 ][ "first_name" ], "Tom"
    assert_equal doctors[ 2 ][ "first_name" ], "Tony"
  end  
end
