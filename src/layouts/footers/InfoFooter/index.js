import { Container } from "@material-ui/core"
import FoodFooter from "./FoodFooter"
import RestaurantFooter from "./RestaurantFooter"
import FreshFooter from './FreshFooter'

const InforFooter = ({ pathname }) => {
  return (
    <Container maxWidth="lg">
      {pathname.startsWith('/food') && <FoodFooter />}
      {pathname.startsWith('/table') && <RestaurantFooter />}
      {pathname.startsWith('/fresh') && <FreshFooter /> } 
    </Container>
  )
}

export default InforFooter
