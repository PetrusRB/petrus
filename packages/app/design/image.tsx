import { useMemo, useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { SolitoImage } from 'solito/image';

type BlurImageProps = {
  uri: string;
  width?: number;
  height?: number;
  blurhash?: string; // Optional blurhash for React Native
  style?: any;
};

// Default placeholder (low-res Base64 image)
const defaultPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHfgL6U8aHmwAAAABJRU5ErkJggg==';

const BlurImage = ({ uri, width, height, blurhash, style }: BlurImageProps) => {
  const [base64, setBase64] = useState<string>(blurhash || defaultPlaceholder);

  // Function to convert image to Base64
  const convertToBase64 = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      return defaultPlaceholder;
    }
  };

  // Effect to fetch and convert image on mount
  useEffect(() => {
    if (!blurhash && uri && Platform.OS === 'web') {
      convertToBase64(uri).then((base64String) => {
        setBase64(base64String);
      });
    }
  }, [uri, blurhash]);

  return (
    <SolitoImage
      src={uri}
      placeholder="blur"
      blurDataURL={base64}
      width={width || 60}
      height={height || 60}
      alt="Image with blur"
      style={style}
    />
  );
};

export { BlurImage };