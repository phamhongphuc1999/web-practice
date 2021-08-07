import React from "react";
import RestaurantBanner from "../../components/restaurant/RestaurantBanner";
import CategoryTag from "../../components/restaurant/CategoryTab";
import SlideList from "../../components/restaurant/SlideList";
import RestaurantCollection from "../../components/restaurant/RestaurantCollection";
import RestaurantLocation from "../../components/restaurant/RestaurantLocation";
import RestaurantBlock from "../../components/restaurant/RestaurantBlock";
import { Container } from "@material-ui/core";

const Restaurant = () => {
  return (
    <div style={{ paddingTop: "70px" }}>
      <RestaurantBanner />
      <Container maxWidth="lg">
        <CategoryTag />
        <SlideList />
        <RestaurantCollection />
        <RestaurantLocation />
        <RestaurantBlock />
      </Container>
    </div>
  );
};

export default Restaurant;
