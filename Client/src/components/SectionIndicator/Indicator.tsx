import { IconProps, IndicatorProps } from "../../types";
import Icon from "../Icon/Icon";
import { IndicatorContainer, SectionName } from "./IndicatorStyles";

interface indicatorProps {
  indicator: IndicatorProps;
  $isUnique?: boolean;
}

function Indicator({ indicator, $isUnique }: indicatorProps) {
  const { sectionName, src, alt } = indicator;

  const iconProps: IconProps = {
    src: src,
    alt: alt,
  };
  return (
    <IndicatorContainer $isUnique={$isUnique}>
      <Icon icon={iconProps} />
      <SectionName>{sectionName}</SectionName>
    </IndicatorContainer>
  );
}

export default Indicator;
