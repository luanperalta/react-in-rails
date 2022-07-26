require "test_helper"

class Api::V1::AirlinesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @airlines = Airline.all
    @airline = Airline.first
  end
  
  test "should get all airlines" do
    get api_v1_airlines_url

    assert_response :success
    assert_equal @airlines.size, JSON.parse(@response.body).size
  end

  test "should show airline" do
    get api_v1_airline_url(@airline.slug)

    assert_response :success
    assert_equal @airline.id, JSON.parse(@response.body)['id']
  end
end
