import { IconProps, IndicatorProps } from "../../types";
import Icon from "../Icon/Icon";
import { IndicatorContainer, SectionName } from "./IndicatorStyles";

interface indicatorProps {
  indicator: IndicatorProps;
}

function Indicator({ indicator }: indicatorProps) {
  const { sectionName, src, alt } = indicator;

  const iconProps: IconProps = {
    src: src,
    alt: alt,
  };
  return (
    <IndicatorContainer>
      <Icon icon={iconProps} />
      <SectionName>{sectionName}</SectionName>
    </IndicatorContainer>
  );
}

export default Indicator;
