import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";
import ReviewForm from "./ReviewForm";
import Review from "./Review";

const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`
const Column = styled.div`
  background: #fff;
  height: 100vh;
  overflow: scroll;

  &:last-child {
    background: #000;
  }
`
const Main = styled.div`
  padding-left: 50px;
`

const Airline = (props) => {
  const [airline, setAirline] = useState({})
  const [review, setReview] = useState({})
  const [reviews, setReviews] = useState([])
  const [loaded, setLoaded] = useState(false)
  const params = useParams()

  useEffect(() => {
    const url = `/api/v1/airlines/${params.slug}`

    axios.get(url)
      .then(resp => {
        setAirline(resp.data)
        setReviews(resp.data.reviews)
        setLoaded(true)
      })
      .catch(resp => console.log(resp))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const csrfToken = document.querySelector('[name=csrf-token]').content
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken

    const airline_id = airline.id
    axios.post('/api/v1/reviews', { ...review, airline_id })
    .then(resp => {
      setReviews([...reviews, resp.data])
      setReview({ title: '', description: '', score: 0 })
    })
    .catch(resp => {})
  }

  const handleChange = (e) => {
    setReview({...review, [e.target.name]: e.target.value })  
  }

  const setRating = (score, e) => {
    setReview({...review, score})
  }

  let total, average = 0
  let userReviews
  if (loaded && reviews) {
    userReviews = reviews.map( (item) => {
      total = reviews.reduce((total, review) => total + review.score, 0)
      average = total > 0 ? (parseFloat(total) / parseFloat(reviews.length)) : 0

      return (
        <Review
          key={item.id}
          attributes={item}
        />
      )
    })
  }

  return (
    <Wrapper>
      {
        loaded &&
        <>
          <Column>
            <Main>
              <Header
                attributes={airline}
                reviews={reviews}
                average={average}
              />
              <div className="reviews">{userReviews}</div>
            </Main>
          </Column>
          <Column>
            <ReviewForm 
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              setRating={setRating}
              attributes={airline}
              review={review}
            />
          </Column>
        </>
      }
    </Wrapper>
  )
}

export default Airline