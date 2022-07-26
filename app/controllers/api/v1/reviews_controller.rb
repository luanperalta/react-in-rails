class Api::V1::ReviewsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    review = Review.new(review_params)

    if review.save
      render json: review, include: [:airline]
    else
      render json: { error: review.errors.messages }, status: :unprocessable_entity
    end
  end

  def destroy
    review = Review.find(params[:id])

    if review.destroy
      head :no_content
    else
      render json: { errors: review.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def airline
    @airline = Airline.find(params[:airline_id])
  end

  def review_params
    params.require(:review).permit(:airline_id, :description, :score, :title)
  end
end
