import React from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import OrderTable from "./OrderTable";
import OrderDetails from "./OrderDetails";

const HomeScreen = () => {
  return (
    <div>
      <TopBar />
      <Header />
      <OrderDetails />
      <OrderTable />
    </div>
  );
};

export default HomeScreen;
