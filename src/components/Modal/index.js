import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import './style.scss'

const Modal = ({
                   children,
                   onClose,
                   nextModal,
                   prevModal,
                   open,
                   nextStepAvaible,
                   prevStepAvaible,
                   customClass
               }) => open &&
    ReactDOM.createPortal(
        <div className={`modal ${customClass}`}>
            <div className="modal__exit" onClick={onClose}>
                <p>
                    Quit tutorial
                </p>
            </div>
            <div className='modal__next'>
                {children}
            </div>
            {nextStepAvaible &&
            <div className="modal__next__step" onClick={nextModal}>
                <p>
                    Next step
                </p>
            </div>
            }
            {prevStepAvaible &&
            <div className="modal__prev__step" onClick={prevModal}>
                <p>
                    Previous step
                </p>
            </div>
            }
        </div>, document.getElementById('portal')
    );

Modal.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func,
    prevModal: PropTypes.func,
    nextModal: PropTypes.func,
    open: PropTypes.bool,
    nextStepAvaible: PropTypes.bool,
    prevStepAvaible: PropTypes.bool,
    customClass: PropTypes.string,
};

Modal.defaultProps = {
    customClass: '',
    open: true,
    onClose: () => {
    },
    prevModal: () => {
    },
    nextModal: () => {
    },
    children: <div>NODE</div>,
    nextStepAvaible: true,
    prevStepAvaible: false,
};
export default Modal;