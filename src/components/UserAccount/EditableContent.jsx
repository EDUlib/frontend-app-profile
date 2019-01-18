import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';


function EditableContent(props) {
  const {
    isEditing,
    disabled,
    renderStatic,
    renderEditable,
    renderEditing,
    cancel,
  } = props;

  return (
    <div className="editable-content">
      {disabled ? renderStatic(props) : renderEditable(props)}
      <CSSTransition
        in={isEditing}
        timeout={1000}
        classNames="edit-panel"
        unmountOnExit
      >
        <div className="edit-panel-container">
          <div
            className="edit-panel-bg"
            onClick={cancel}
            aria-hidden
          />
          <div className="edit-panel">
            {renderEditing(props)}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
}

EditableContent.propTypes = {
  isEditing: PropTypes.bool,
  disabled: PropTypes.bool,
  renderStatic: PropTypes.func,
  renderEditable: PropTypes.func,
  renderEditing: PropTypes.func,
  cancel: PropTypes.func,
};

EditableContent.defaultProps = {
  isEditing: false,
  disabled: false,
  renderStatic: () => {},
  renderEditable: () => {},
  renderEditing: () => {},
  cancel: () => {},
};


export default EditableContent;
