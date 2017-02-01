import React, { Component, PropTypes } from 'react';
class View extends Component {
  constructor(props, context) {
    super(props, context);
    this.onCharacter = this.onCharacter.bind(this);
    // listen to keystrokes in the
    document.addEventListener('keyup', this.onCharacter);
  }
  componentWillUnmount() {
    // clean up our binding to keydown on the document
    document.removeEventListener('keyup', this.onCharacter);
  }
  onCharacter(event) {
    const { props } = this;

    if (event.key === 'Backspace') {
    // if the user pressed the backspace, remove the last character
    props.removeCharacter();
    } else if (event.key.length === 1) {
    // otherwise, when a keystroke came our way, add it!
    props.insertCharacter(event.key);
    }
  }

  render() {
    const { text } = this.props;
    return (
      <div>
        {text}
      </div>
    );
  }
}

View.propTypes = {
  insertCharacter: PropTypes.func.isRequired,
  removeCharacter: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
