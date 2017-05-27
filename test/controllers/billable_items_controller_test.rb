require 'test_helper'

class BillableItemsControllerTest < ActionController::TestCase
  setup do
    @billable_item = billable_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:billable_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create billable_item" do
    assert_difference('BillableItem.count') do
      post :create, billable_item: { name: @billable_item.name, price: @billable_item.price, tax: @billable_item.tax, total: @billable_item.total, type: @billable_item.type }
    end

    assert_redirected_to billable_item_path(assigns(:billable_item))
  end

  test "should show billable_item" do
    get :show, id: @billable_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @billable_item
    assert_response :success
  end

  test "should update billable_item" do
    patch :update, id: @billable_item, billable_item: { name: @billable_item.name, price: @billable_item.price, tax: @billable_item.tax, total: @billable_item.total, type: @billable_item.type }
    assert_redirected_to billable_item_path(assigns(:billable_item))
  end

  test "should destroy billable_item" do
    assert_difference('BillableItem.count', -1) do
      delete :destroy, id: @billable_item
    end

    assert_redirected_to billable_items_path
  end
end
