import { Container } from "@material-ui/core";
import React from "react";
import CategoryFooter from "./CategoryFooter";
import InforFooter from "./InfoFooter";
import MainFooter from "./MainFooter";
import MerchantAppFooter from "./MerchantAppFooter";
import PartnerFooter from "./PartnerFooter";
import PreservationFooter from "./PreservationFooter";

const StandardFooter = ({ pathname }) => {
  return (
    <Container maxWidth="lg">
      <PreservationFooter />
      <MerchantAppFooter />
      <PartnerFooter />
      <InforFooter pathname={pathname} />
      <CategoryFooter />
      <MainFooter />
    </Container>
  );
};

export default StandardFooter;
