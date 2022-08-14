import success from "../../../../../../Assets/success-image.svg"
import './AfterSent.scss'

export const AfterSent = ({ status, message }: { status: boolean; message: string; }) => {

  return (
    <div className="after-sent">
      <div className="after-sent__container">
        <h1 className="after-sent__title title"
          style={!status ? {
            color: '#CB3D40',
            borderBottom: '2px solid #CB3D40'
          }
            : {}
          }
        >
          {message}
        </h1>
        <div className="after-sent__notification">
          {status?.valueOf() &&
            <img src={success} alt="Success" />
          }
        </div>
      </div>
    </div>
  )
}