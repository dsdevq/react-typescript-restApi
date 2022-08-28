import FormBody from "./form/FormBody";
import './PostRequest.scss'

export const PostRequest = () => {
  return (
    <section id="post-request" className="main__post-request">
      <div className="post-request__container container-request">
        <h1 className="post-request__title title">
          Working with POST request
        </h1>
        <FormBody />
      </div>
    </section>
  )
}