import React, { useEffect } from 'react';

const useIsMounted = () => {
  const isMounted = React.useRef(true);

  useEffect(() => {
    isMounted.current = false;
  }, []);

  return isMounted.current;
};

export default useIsMounted;
