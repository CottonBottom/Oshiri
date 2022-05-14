import { WrappingStats } from "../utils/constants";
import { oshiriSizeDigitToScale } from "../utils/conversions";
import Wrapping from "./Wrapping";
import logo from "../assets/images/logo.png";
import spiral from "../assets/images/spiral.svg";

type Props = {
  wrappingStats: WrappingStats;
  isLarge?: boolean;
};

const WrappingPreview = ({ wrappingStats, isLarge }: Props) => {
  return (
    <>
      <div
        className={`oshiri-wrapping-preview ${
          isLarge ? "oshiri-wrapping-preview--large" : ""
        }`}
        style={{ backgroundImage: `url(${spiral})` }}
      >
        <Wrapping
          oshiriSize={oshiriSizeDigitToScale(1)}
          wrappingStats={wrappingStats}
        ></Wrapping>
        <img
          className="oshiri-wrapping-preview__logo"
          src={logo}
          alt="oshiri-logo"
        />
      </div>
    </>
  );
};

export default WrappingPreview;
