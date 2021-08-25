import { Card, CardContent } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillAppstore } from "react-icons/ai";
import VerticalItem from "./VerticalItem";

const CollectionDetail = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card className="mt-5 px-5">
      <CardContent>
        <div className="flex items-center">
          <div className="mr-auto font-extrabold">{t("collection")}</div>
          <div className="flex items-center text-sm text-blue-500 cursor-pointer">
            <AiFillAppstore className="mr-2" />
            <span>{t("seeAll")}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          {data.map((element, index) => (
            <VerticalItem className="col-span-1" key={index} data={element} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionDetail;
