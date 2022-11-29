import './InfoTooltip.css';
import imageSuccess from '../../images/InfoToolTip/popup-image-success.png';
import imageError from '../../images/InfoToolTip/popup-image-error.png';

function InfoTooltip({onClose, isOpen, status, image: {imageType} = {}}) {

  const images = {
    imageSuccess: imageSuccess,
    imageError: imageError
  };

  return(
    <div className={`popup popup_type_tooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img className="popup__image_type_tooltip" alt="изображение загружается" src={images[imageType]}></img>
        <h2 className="popup__title_type_tooltip">{status}</h2>
        <button type="button" aria-label="Закрыть" className="popup__close-button" onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoTooltip;