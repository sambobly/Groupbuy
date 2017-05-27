require 'test_helper'

class PaymentsControllerTest < ActionController::TestCase
  setup do
    @payment = payments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:payments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create payment" do
    assert_difference('Payment.count') do
      post :create, payment: { appointment_id: @payment.appointment_id, date: @payment.date, doctor_id: @payment.doctor_id, invoice_id: @payment.invoice_id, note: @payment.note, patient_id: @payment.patient_id, paymentType_id: @payment.paymentType_id, total: @payment.total }
    end

    assert_redirected_to payment_path(assigns(:payment))
  end

  test "should show payment" do
    get :show, id: @payment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @payment
    assert_response :success
  end

  test "should update payment" do
    patch :update, id: @payment, payment: { appointment_id: @payment.appointment_id, date: @payment.date, doctor_id: @payment.doctor_id, invoice_id: @payment.invoice_id, note: @payment.note, patient_id: @payment.patient_id, paymentType_id: @payment.paymentType_id, total: @payment.total }
    assert_redirected_to payment_path(assigns(:payment))
  end

  test "should destroy payment" do
    assert_difference('Payment.count', -1) do
      delete :destroy, id: @payment
    end

    assert_redirected_to payments_path
  end
end
