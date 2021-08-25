import React from "react";
import RestaurantBanner from "./components/RestaurantBanner";
import CategoryTag from "./components/CategoryTab";
import SlideList from "./components/SlideList";
import RestaurantCollection from "./components/RestaurantCollection";
import RestaurantLocation from "./components/RestaurantLocation";
import RestaurantBlock from "./components/RestaurantBlock";
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
