const CheckedIcon = ({ width, height }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="icons">
        <path
          id="Subtract"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM15.0654 10.9091C15.3949 10.5796 15.3949 10.0454 15.0654 9.71588C14.7359 9.38637 14.2016 9.38637 13.8721 9.71588L10.5312 13.0568L9.44037 11.9659C9.11087 11.6364 8.57663 11.6364 8.24713 11.9659C7.91762 12.2954 7.91762 12.8296 8.24713 13.1591L9.93463 14.8466C10.2641 15.1761 10.7984 15.1761 11.1279 14.8466L15.0654 10.9091Z"
          fill="url(#paint0_linear_1193_20219)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1193_20219"
          x1="30.1636"
          y1="37.6875"
          x2="1.89078"
          y2="36.1428"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#71CBFF" />
          <stop offset="1" stopColor="#BACB91" />
        </linearGradient>
      </defs>
    </svg>
  );
};
export default CheckedIcon;
