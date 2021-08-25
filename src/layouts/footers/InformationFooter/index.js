import { Container } from "@material-ui/core";
import FoodFooter from "./FoodFooter";
import RestaurantFooter from "./RestaurantFooter";
import FreshFooter from "./FreshFooter";

const InformationFooter = ({ pathname }) => {
  return (
    <Container maxWidth="lg">
      {(() => {
        if (pathname.startsWith("/table")) return <RestaurantFooter />;
        else if (pathname.startsWith("/fresh")) return <FreshFooter />;
        else return <FoodFooter />;
      })()}
    </Container>
  );
};

export default InformationFooter;
