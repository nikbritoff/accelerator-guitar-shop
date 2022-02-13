import cn from 'classnames';
import { MouseEvent, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';

type WithPopupControlsProps = {
  children: React.ReactNode,
  modalClass: string,
  isActive: boolean,
  setIsModalActive: (isActive: boolean) => void,
  checkElement?: string,
}

type KeyboardEvent = {
  key: string,
};

function WithPopupControls({children, modalClass, isActive, setIsModalActive, checkElement = 'div'}: WithPopupControlsProps): JSX.Element {
  const handleCloseButtonClick = (evt: MouseEvent<HTMLButtonElement>):void => {
    evt.preventDefault();
    setIsModalActive(false);
  };

  const handleOverlayClickHandler = ():void => {
    setIsModalActive(false);
  };

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';

      const closeReviewModal = (evt: KeyboardEvent):void => {
        if(evt.key === 'Escape') {
          setIsModalActive(false);
        }
      };
      window.addEventListener('keydown', closeReviewModal);
      return () => {
        window.removeEventListener('keydown', closeReviewModal);
        document.body.style.overflow = '';
      };
    }
  },[isActive, setIsModalActive]);

  return (
    <div className={cn(
      'modal',
      {modalClass},
      {'is-active' : isActive},
    )}
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          data-close-modal
          onClick={handleOverlayClickHandler}
        >
        </div>
        <FocusTrap
          active={isActive}
          focusTrapOptions={{fallbackFocus: checkElement}}
        >
          <div className="modal__content">
            {children}
            <button
              className="modal__close-btn button-cross"
              type="button"
              aria-label="Закрыть"
              onClick={handleCloseButtonClick}
            >
              <span className="button-cross__icon"></span>
              <span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </FocusTrap>
      </div>
    </div>
  );
}

export default WithPopupControls;
