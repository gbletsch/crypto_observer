import React from "react";
import { AddBalance } from "./AddBalance";
import { BalancesList } from "./BalancesList";

function BalancePage() {
  return (
    <div>
      <AddBalance />
      <BalancesList />
    </div>
  );
}

export default BalancePage;
