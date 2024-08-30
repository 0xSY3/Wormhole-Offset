import React from "react";

import { marketingConfig } from "@/config/marketing";
import { useState } from "react";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { isLoggedInAtom } from "@/atoms/auth";
import { useNavigate } from "react-router-dom";
// import { ethers } from "ethers";
// import { web3WalletAtom, contractAtom } from "@/atoms/web3";
import { connectToHashPack } from "../../config/walletconnect";
import { DynamicContextProvider, DynamicWidget} from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors} from '@dynamic-labs/ethereum';

// import abi from "../../../abi.json";

// const CONTRACT_ADDRESS: string = import.meta.env.VITE_CONTRACT_ADDRESS;

const MainLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [color] = useState(false);

  const [_, setIsLoggedin] = useAtom(isLoggedInAtom);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedin(false);
    navigate("/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* fixed left-0 top-0 */}
      <header
        style={color ? { backgroundColor: "rgba(0,0,0,0.4)" } : {}}
        className="z-10 w-full backdrop-blur duration-300  ease-in"
      >
        <div className="m-auto flex h-20 items-center justify-between p-5 py-6">
          <MainNav items={marketingConfig.mainNav} />

          <nav className="flex flex-row gap-2">
            {/* <Link to="/pay">
              <Button variant="secondary" className="mr-4">
                Pay
              </Button>
            </Link> */}

            <Button onClick={handleLogout} className="max-w-32">
              Logout
            </Button>

            {/* <Button
              onClick={connectToHashPack}
              className="max-w-32 overflow-x-clip text-ellipsis"
            >
              Connect Wallet
            </Button> */}
            <DynamicContextProvider settings={{environmentId:'bd8e0047-fe5b-47c8-b543-0ae2f12cbcd8', walletConnectors: [EthereumWalletConnectors]}}>
    <DynamicWidget />
</DynamicContextProvider>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <SiteFooter />
    </div>
  );
};

export default MainLayout;
