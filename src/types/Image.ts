interface Image {
  id: number,
  key: string;
  bucket: string;
  isImageScalingPending: boolean;
  url: string;
}

export default Image;
