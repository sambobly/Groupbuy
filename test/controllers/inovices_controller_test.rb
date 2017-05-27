require 'test_helper'

class InovicesControllerTest < ActionController::TestCase
  setup do
    @inovice = inovices(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:inovices)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create inovice" do
    assert_difference('Inovice.count') do
      post :create, inovice: { appointment: @inovice.appointment, date: @inovice.date, discount: @inovice.discount, doctor: @inovice.doctor, item: @inovice.item, note: @inovice.note, patient: @inovice.patient, price: @inovice.price, quantity: @inovice.quantity, tax: @inovice.tax, total: @inovice.total }
    end

    assert_redirected_to inovice_path(assigns(:inovice))
  end

  test "should show inovice" do
    get :show, id: @inovice
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @inovice
    assert_response :success
  end

  test "should update inovice" do
    patch :update, id: @inovice, inovice: { appointment: @inovice.appointment, date: @inovice.date, discount: @inovice.discount, doctor: @inovice.doctor, item: @inovice.item, note: @inovice.note, patient: @inovice.patient, price: @inovice.price, quantity: @inovice.quantity, tax: @inovice.tax, total: @inovice.total }
    assert_redirected_to inovice_path(assigns(:inovice))
  end

  test "should destroy inovice" do
    assert_difference('Inovice.count', -1) do
      delete :destroy, id: @inovice
    end

    assert_redirected_to inovices_path
  end
end
