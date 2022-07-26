require "test_helper"

class Api::V1::ReviewsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @airline = airlines(:southwest)
  end
  
  test "should create a review" do
    reviews_size = @airline.reviews.size
    post api_v1_reviews_url, params: { review: { title: 'Great', description: 'I liked a lot!!!', score: 5, airline_id: @airline.id } }

    assert_response :success
    assert_equal reviews_size + 1, @airline.reviews.size
  end
end
