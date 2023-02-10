import { useWeb3Contract } from "react-moralis";
import { abi, contractAddresses } from "../constants";
import { useMoralis } from "react-moralis";
import { useState, useEffect } from "react";
import { useNotification, Loading } from "@web3uikit/core";
import { ethers } from "ethers";

export default function Body() {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const dexSimAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;
  const [buterinsForUser, setButerinsForUser] = useState(0);
  const [nakamotosForUser, setNakamotosForUser] = useState(0);
  const [buterinsForDex, setButerinsForDex] = useState(0);
  const [nakamotosForDex, setNakamotosForDex] = useState(0);
  const [buterinsForSwap, setButerinsForSwap] = useState(0);
  const [nakamotosForSwap, setNakamotosForSwap] = useState(0);
  const [dexButerinsBalance, setDexButerinsBalance] = useState(0);
  const [dexNakamotosBalance, setDexNakamotosBalance] = useState(0);
  const [userButerinsBalance, setUserButerinsBalance] = useState(0);
  const [userNakamotosBalance, setUserNakamotosBalance] = useState(0);
  const [addUserLiquidityLoading, setAddUserLiquidityLoading] = useState(false);
  const [addDexLiquidityLoading, setAddDexLiquidityLoading] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const dispatch = useNotification();

  //----------------------------------Contract Functions--------------------------------//
  const { runContractFunction: getButerins } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "getButerins",
    params: {},
  });

  const { runContractFunction: getNakamotos } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "getNakamotos",
    params: {},
  });

  const { runContractFunction: getUserButerinsBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "getUserButerinBalance",
    params: {},
  });

  const { runContractFunction: getUserNakamotosBalance } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "getUserNakamotosBalance",
    params: {},
  });

  const { runContractFunction: addButerinsToUser } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "addButerinsToUser",
    params: {
      amount: buterinsForUser,
    },
  });

  const { runContractFunction: addNakamotosToUser } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "addNakamotosToUser",
    params: {
      amount: nakamotosForUser,
    },
  });

  const { runContractFunction: addUser } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "addUser",
    params: {},
  });

  const { runContractFunction: reset } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "reset",
    params: {},
  });

  const { runContractFunction: addLiquidity } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "addLiquidity",
    params: {
      amountNakamotos: nakamotosForDex,
      amountButerins: buterinsForDex,
    },
  });

  const { runContractFunction: swapButerins } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "swapButerins",
    params: {
      amount: buterinsForSwap,
    },
  });

  const { runContractFunction: swapNakamotos } = useWeb3Contract({
    abi: abi,
    contractAddress: dexSimAddress,
    functionName: "swapNakamotos",
    params: {
      amount: nakamotosForSwap,
    },
  });
  //----------------------------------------------------------------------------------//

  //-------------------------------Notification Handlers------------------------------//
  const handleError = async function (tx) {
    handleErrorNotification(tx);
  };

  const handleErrorNotification = function () {
    dispatch({
      type: "error",
      message: "Please Retry.",
      title: "That Didn't Work :(",
      position: "topR",
    });
  };

  const handleTokensAddedSuccess = async function (tx) {
    await tx.wait(1);
    handleTokensAddedNotification(tx);
  };

  const handleTokensAddedNotification = function () {
    dispatch({
      type: "success",
      message: "Tokens Added!",
      title: "Notification",
      position: "topR",
    });
  };

  const handleAddUserSuccess = async function (tx) {
    await tx.wait(1);
    handleAddUserNotification(tx);
    document.getElementById("addUserButton").disabled = true;
  };

  const handleAddUserNotification = function () {
    dispatch({
      type: "success",
      message: "User Added!",
      title: "Notification",
      position: "topR",
    });
  };

  const handleSwapSuccess = async function (tx) {
    await tx.wait(1);
    handleSwapNotification(tx);
  };

  const handleSwapNotification = function () {
    dispatch({
      type: "success",
      message: "Swap Confirmed!",
      title: "Notification",
      position: "topR",
    });
  };

  //----------------------------------------------------------------------------------//

  //----------------------------------Call Handlers--------------------------------//
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/"
  );

  const dexSim = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    abi,
    provider
  );

  const getUserBalanceHandler = async () => {
    if (typeof window != "undefined") {
      const numUserButerins = await getUserButerinsBalance({
        onError: handleError,
      });
      const numUserNakamotos = await getUserNakamotosBalance({
        onError: handleError,
      });
      const numUserButerinsAsBigNumber = ethers.BigNumber.from(numUserButerins);
      setUserButerinsBalance(numUserButerinsAsBigNumber.toNumber());
      const numUserNakamotosAsBigNumber =
        ethers.BigNumber.from(numUserNakamotos);
      setUserNakamotosBalance(numUserNakamotosAsBigNumber.toNumber());
    }
  };

  const getDexBalanceHandler = async (e) => {
    e.preventDefault();
    if (typeof window != "undefined") {
      const numButerins = await getButerins({
        onError: handleError,
      });
      const numNakamotos = await getNakamotos({
        onError: handleError,
      });
      const numButerinsAsBigNumber = ethers.BigNumber.from(numButerins);
      setDexButerinsBalance(numButerinsAsBigNumber.toNumber());
      const numNakamotosAsBigNumber = ethers.BigNumber.from(numNakamotos);
      setDexNakamotosBalance(numNakamotosAsBigNumber.toNumber());
    }
  };

  const addLiquidityToUserHandler = async (e) => {
    e.preventDefault();
    console.log(buterinsForUser);
    console.log(nakamotosForUser);
    if (buterinsForUser > 0 && buterinsForUser != null) {
      setAddUserLiquidityLoading(true);
      try {
        const tx = await addButerinsToUser({
          onSuccess: handleTokensAddedSuccess,
          onError: handleError,
        });
        dexSim.once("AddUserLiquidity", () => {
          setAddUserLiquidityLoading(false);
        });
        await tx.wait();
      } catch (error) {
        console.error(error);
      }
    }
    if (nakamotosForUser > 0 && nakamotosForUser != null) {
      setAddUserLiquidityLoading(true);
      try {
        const tx = await addNakamotosToUser({
          onSuccess: handleTokensAddedSuccess,
          onError: handleError,
        });
        dexSim.once("AddUserLiquidity", () => {
          setAddUserLiquidityLoading(false);
        });
        await tx.wait();
      } catch (error) {
        setAddUserLiquidityLoading(false);
        console.error(error);
      }
    }
    if (
      (nakamotosForUser == null || nakamotosForUser == 0) &&
      (buterinsForUser == null || buterinsForUser == 0)
    ) {
      dispatch({
        type: "warning",
        message: "There were no values entered for adding user liquidity.",
        title: "No Input",
        position: "topR",
      });
    }
  };

  const addUserHandler = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    try {
      const tx = await addUser({
        onSuccess: handleAddUserSuccess,
        onError: handleError,
      });
      dexSim.on("AddUser", () => {
        setAddUserLoading(false);
      });
      await tx.wait();
    } catch (error) {
      setAddUserLoading(false);
      console.error(error);
    }
  };

  const resetHandler = async (e) => {
    e.preventDefault();
    try {
      await reset({
        onError: handleError,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addLiquidityHandler = async (e) => {
    e.preventDefault();
    console.log(nakamotosForDex);
    console.log(buterinsForDex);
    if (nakamotosForDex > 0 || buterinsForDex > 0) {
      setAddDexLiquidityLoading(true);
      try {
        const tx = await addLiquidity({
          onSuccess: handleTokensAddedSuccess,
          onError: handleError,
        });
        dexSim.once("AddDexLiquidity", () => {
          setAddDexLiquidityLoading(false);
        });
        await tx.wait();
      } catch (error) {
        setAddDexLiquidityLoading(false);
        console.error(error);
      }
    } else {
      dispatch({
        type: "warning",
        message:
          "There were no values entered for adding liquidity to the dex.",
        title: "No Input",
        position: "topR",
      });
    }
  };

  const swapButerinsHandler = async (e) => {
    e.preventDefault();
    setButerinsForSwap(document.getElementById("buterinsForSwapInput").value);
    console.log(buterinsForSwap);
    await swapButerins({
      onSuccess: handleSwapSuccess,
      onError: handleError,
    });
  };

  const swapNakamotosHandler = async (e) => {
    e.preventDefault();
    setNakamotosForSwap(document.getElementById("nakamotosForSwapInput").value);
    console.log(nakamotosForSwap);
    await swapNakamotos({
      onSuccess: handleSwapSuccess,
      onError: handleError,
    });
  };
  //----------------------------------------------------------------------------------//

  //Baby Blue: 04ACB5
  //Purple: 583a64
  //Light Purple: 6f497e
  //Yellow: F78D04
  //Orange: E24603
  //Space Blue: 393C6F

  return (
    <div className="text-3xl mb-32 grid gap-3 grid-rows-3 grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 mt-32 justify-items-center justify-self-center">
      <div className="bg-[#ffffff] text-center border-2 border-slate-200 max-w-md p-5 rounded-xl bg-opacity-40 backdrop-filter backdrop-blur-sm">
        <div className="mt-28">
          <button
            type="generic"
            onClick={resetHandler}
            className="bg-[#E24603] hover:bg-[#d15621] shadow-2xl text-[#ffffff] px-3 py-2 rounded-sm mt-4 mb-12 hover:-translate-y-1 ease-in-out duration-300"
          >
            Reset Simulation
          </button>
        </div>
        <div className="p-2 bg-[#F78D04] shadow-2xl rounded-md">
          <form onSubmit={addLiquidityHandler}>
            <div className="my-3">
              <h2 className="font-oswald">
                Provide Liquidity to the Decentralized Exchange
              </h2>
            </div>
            <div className="my-3">
              <label>Buterins for DEX</label>
              <br />
              <input
                onChange={(e) => {
                  setButerinsForDex(e.target.value);
                }}
                className="my-3 rounded-2xl pl-2 w-40 text-center"
                type="number"
                id="nakamotosForDexInput"
                placeholder="1"
                step="1"
              />
            </div>
            <div className="my-3">
              <label>Nakamotos for DEX</label>
              <input
                className="my-3 rounded-2xl pl-2 w-40 text-center"
                type="number"
                id="buterinsForDexInput"
                placeholder="2"
                step="1"
                onChange={(e) => {
                  setNakamotosForDex(e.target.value);
                }}
              />
            </div>
            <div className="my-3">
              <button
                type="submit"
                className="bg-[#6f497e] hover:bg-[#583a64] text-[#ffffff] px-3 py-2 rounded-sm mt-4 mb-12 hover:-translate-y-1 ease-in-out duration-300"
              >
                {addDexLiquidityLoading ? (
                  <div>
                    <Loading
                      fontSize={16}
                      size={16}
                      spinnerColor="#ffffff"
                      spinnerType="wave"
                      text="Loading..."
                    />
                  </div>
                ) : (
                  "Add Liquidity"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white text-center border-2 border-slate-200 max-w-md p-8 rounded-xl bg-opacity-40 backdrop-filter backdrop-blur-sm">
        <div className="my-4">
          <h3>{`DEX Buterins: ${dexButerinsBalance}`}</h3>
          <h3>{`DEX Nakamotos: ${dexNakamotosBalance}`}</h3>
          <button
            type="generic"
            onClick={getDexBalanceHandler}
            className="bg-[#6f497e] hover:bg-[#583a64] shadow-2xl text-[#ffffff] px-3 py-2 rounded-sm mt-4 mb-12 hover:-translate-y-1 ease-in-out duration-300"
          >
            Update DEX Liquidity
          </button>
        </div>
        <div className="my-4">
          <h3>{`User Buterins: ${userButerinsBalance}`}</h3>
          <h3>{`User Nakamotos: ${userNakamotosBalance}`}</h3>
          <button
            type="generic"
            onClick={getUserBalanceHandler}
            className="bg-[#6f497e] hover:bg-[#583a64] shadow-2xl text-[#ffffff] px-3 py-2 rounded-sm mt-4 mb-12 hover:-translate-y-1 ease-in-out duration-300"
          >
            Update User Liquidity
          </button>
        </div>
        <div className="my-4 p-2 px-4 bg-[#F78D04] shadow-2xl rounded-md">
          <form className="mt-5" onSubmit={swapButerinsHandler}>
            <h2>Buterins for Nakamotos</h2>
            <input
              className="my-3 rounded-2xl pl-2 w-40 text-center"
              type="number"
              id="buterinsForSwapInput"
              placeholder="2"
              step="1"
            />
            <br />
            <button
              className="bg-[#04ACB5] hover:bg-[#13979e] shadow-2xl text-[#ffffff] px-3 py-2 rounded-sm mt-4 hover:-translate-y-1 ease-in-out duration-300"
              type="submit"
            >
              Swap
            </button>
          </form>
          <form className="mt-5" onSubmit={swapNakamotosHandler}>
            <h2>Nakamotos for Buterins</h2>
            <input
              className="my-3 rounded-2xl pl-2 w-40 text-center"
              type="number"
              id="nakamotosForSwapInput"
              placeholder="1"
              step="1"
            />
            <br />
            <button
              className="bg-[#04ACB5] hover:bg-[#13979e] shadow-2xl text-[#ffffff] px-3 py-2 mb-12 rounded-sm mt-4 hover:-translate-y-1 ease-in-out duration-300"
              type="submit"
            >
              Swap
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white text-center border-2 border-slate-200 max-w-md p-5 rounded-xl bg-opacity-40  backdrop-filter backdrop-blur-sm">
        <div className="mt-28">
          <button
            type="generic"
            id="addUserButton"
            onClick={addUserHandler}
            className="bg-[#E24603] hover:bg-[#d15621] hover:cursor-pointer  shadow-2xl text-[#ffffff] px-3 py-2 rounded-sm mt-4 mb-12 hover:-translate-y-1 ease-in-out duration-300"
          >
            {addUserLoading ? (
              <div>
                <Loading
                  fontSize={16}
                  size={16}
                  spinnerColor="#ffffff"
                  spinnerType="wave"
                  text="Loading..."
                />
              </div>
            ) : (
              "Add User"
            )}
          </button>
        </div>
        <div className="p-2 bg-[#F78D04] shadow-2xl rounded-md">
          <form onSubmit={addLiquidityToUserHandler}>
            <div className="my-3">
              <h2 className="font-oswald">
                Provide Liquidity to the <br />
                User
              </h2>
            </div>
            <div className="my-3">
              <label>Buterins for User</label>
              <br />
              <input
                onChange={(e) => setButerinsForUser(e.target.value)}
                className="my-3 rounded-2xl pl-2 w-40 text-center"
                type="number"
                id="buterinsForUserInput"
                placeholder="12"
                step="1"
              />
            </div>
            <div className="my-3">
              <label>Nakamotos for User</label>
              <input
                onChange={(e) => setNakamotosForUser(e.target.value)}
                className="my-3 rounded-2xl pl-2 w-40 text-center"
                type="number"
                id="nakamotosForUserInput"
                placeholder="13"
                step="1"
              />
            </div>
            <div className="my-3">
              <button
                type="submit"
                className="bg-[#6f497e] hover:bg-[#583a64] shadow-2xl text-[#ffffff] px-3 py-2 rounded-sm mt-4 mb-12 hover:-translate-y-1 ease-in-out duration-300"
              >
                {addUserLiquidityLoading ? (
                  <div>
                    <Loading
                      fontSize={16}
                      size={16}
                      spinnerColor="#ffffff"
                      spinnerType="wave"
                      text="Loading..."
                    />
                  </div>
                ) : (
                  "Add Liquidity"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
