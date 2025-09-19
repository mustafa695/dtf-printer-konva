import { useEffect, useState } from 'react';

const useImage = (url)  => {
  const [image, setImage] = useState();

  useEffect(() => {
    if (!url) return;
    
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    
    const onLoad = () => {
      setImage(img);
    };
    
    const onError = () => {
      console.error(`Failed to load image: ${url}`);
    };
    
    img.addEventListener('load', onLoad);
    img.addEventListener('error', onError);
    img.src = url;
    
    return () => {
      img.removeEventListener('load', onLoad);
      img.removeEventListener('error', onError);
    };
  }, [url]);

  return [image];
};

export default useImage;