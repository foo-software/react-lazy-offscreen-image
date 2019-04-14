import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './LazyOffscreenBackground.css';

const LazyOffscreenBackground = ({
  children,
  className,
  CustomTag,
  imageUrl,
  ScrollContext,
}) => {
  const [active, setActive] = useState(false);
  const [didEnterView, setDidEnterView] = useState(false);
  const { scrollY } = useContext(ScrollContext);
  const rootRef = useRef(null);

  const onViewEnter = () => {
    // set this state first to prevent duplicated calls
    setDidEnterView(true);

    // load the image in the background. onload of the image - set state.
    const preloaded = new Image();
    preloaded.onload = () => {
      setActive(true);
    };
    preloaded.src = imageUrl;
  };

  const handleView = () => {
    const rootElement = rootRef.current;
    if (rootElement && rootElement.getBoundingClientRect) {
      const { top } = rootElement.getBoundingClientRect();

      // if the element has never entered view and is now in view...
      if (!didEnterView && top < window.innerHeight) {
        onViewEnter();
      }
    }
  }

  // `useEffect` without cleanup to imitate `componentDidMount`
  // and `componentDidUpdate`
  useEffect(() => {
    handleView();
  });

  // trigger only when `scrollY` has changed
  useCallback(() => {
    handleView();
  }, [scrollY]);

  return (
    <CustomTag
      className={classnames('lazyOffscreenImage', className, {
        'lazyOffscreenImage--active': active,
      })}
      style={!active ? {} : { backgroundImage: `url("${imageUrl}")` }}
      ref={rootRef}
    >
      {children}
    </CustomTag>
  );
};

LazyOffscreenBackground.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  CustomTag: PropTypes.string,
  ScrollContext: PropTypes.object.isRequired,
};

LazyOffscreenBackground.defaultProps = {
  children: null,
  className: null,
  CustomTag: 'div',
};

export default LazyOffscreenBackground;
