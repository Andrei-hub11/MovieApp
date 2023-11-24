import { useLocation } from "react-router-dom";
import { MainContainer } from "./GridContainerStyles";

interface GridProps {
  gridAreas: string;
  children: React.ReactNode;
}

function GridContainer({ gridAreas, children }: GridProps) {
  const location = useLocation();

  const currentPath: string = location.pathname;

  return (
    <MainContainer $templateAreas={gridAreas} $currentPath={currentPath}>
      {children}
    </MainContainer>
  );
}

export default GridContainer;
