import './Loader.scss'
import loader from "../../Assets/Preloader.png"

export const Loader = () => {

  return (
    <div className="loader-container">
      <img id="loader" className="loader-image" src={loader} alt="Loader" />
    </div>
  )
}