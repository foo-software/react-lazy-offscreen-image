import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './LazyOffscreenImage.css';

const LazyOffscreenImage = ({
  children,
  className,
  CustomTag,
  imageUrl,
  onLoad,
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
      if (onLoad) {
        onLoad();
      }
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
  };

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

LazyOffscreenImage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  CustomTag: PropTypes.string,
  onLoad: PropTypes.func,
  ScrollContext: PropTypes.object.isRequired,
};

LazyOffscreenImage.defaultProps = {
  children: null,
  className: null,
  CustomTag: 'div',
  onLoad: undefined,
};

export default LazyOffscreenImage;
