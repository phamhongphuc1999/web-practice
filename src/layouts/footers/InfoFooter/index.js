import { Container } from "@material-ui/core"
import FoodFooter from "./FoodFooter"
import RestaurantFooter from "./RestaurantFooter"

const InforFooter = ({ pathname }) => {
  return (
    <Container maxWidth="lg">
      {pathname.startsWith('/food') && <FoodFooter />}
      {pathname.startsWith('/table') && <RestaurantFooter />}
    </Container>
  )
}

export default InforFooter
