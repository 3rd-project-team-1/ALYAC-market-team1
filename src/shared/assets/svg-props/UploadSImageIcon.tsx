export const UploadSImageIcon = (props: React.SVGProps<SVGSVGElement>): React.JSX.Element => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <path d="M0 0H42V42H0V0Z" fill="url(#pattern_upload_s_image)" />
    <defs>
      <pattern
        id="pattern_upload_s_image"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image_upload_s_image" transform="matrix(0.02381 0 0 0.02381 0 0)" />
      </pattern>
      <image id="image_upload_s_image" width="42" height="42" xlinkHref="/upload-s-image.webp" />
    </defs>
  </svg>
);
