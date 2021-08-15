import { Container } from "@material-ui/core";
import React from "react";
import CategoryFooter from "./CategoryFooter";
import InformationFooter from "./InformationFooter";
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
      <InformationFooter pathname={pathname} />
      <CategoryFooter />
      <MainFooter />
    </Container>
  );
};

export default StandardFooter;
