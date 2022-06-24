import React from "react";
import './test-asignment-component.scss'


const TestAsignmentComponent = () => {


  return (
    <section className="main__asignment asignment-section">
      <div className="asignment-section__container">
        <div className="asignment-section__content">
          <h1 className="asignment-section__title title">
          Test assignment for front-end developer
          </h1>
          <div className="asignment-section__text">
          What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </div>
          <div className="asignment-section__button button">
            Sign up
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestAsignmentComponent