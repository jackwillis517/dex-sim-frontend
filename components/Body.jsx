import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import { useNotification } from "@web3uikit/core"
import { ethers } from "ethers"



export default function Body() {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const dexSimAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [buterinsForUser, setButerinsForUser] = useState(0)
    const [nakamotosForUser, setNakamotosForUser] = useState(0) 
    const [buterinsForDex, setButerinsForDex] = useState(0)
    const [nakamotosForDex, setNakamotosForDex] = useState(0)
    const [buterinsForSwap, setButerinsForSwap] = useState(0)
    const [nakamotosForSwap, setNakamotosForSwap] = useState(0)
    const [dexButerinsBalance, setDexButerinsBalance] = useState(0)
    const [dexNakamotosBalance, setDexNakamotosBalance] = useState(0)
    const [userButerinsBalance, setUserButerinsBalance] = useState(0)
    const [userNakamotosBalance, setUserNakamotosBalance] = useState(0)
    const dispatch = useNotification()



    //----------------------------------Contract Functions--------------------------------//
    const {runContractFunction: getButerins} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "getButerins",
        params: {}
    })

    const {runContractFunction: getNakamotos} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "getNakamotos",
        params: {}
    })

    const {runContractFunction: getUserButerinsBalance} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "getUserButerinBalance",
        params: {}
    })

    const {runContractFunction: getUserNakamotosBalance} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "getUserNakamotosBalance",
        params: {}
    })

    const {runContractFunction: addButerinsToUser} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "addButerinsToUser",
        params: {
            amount: buterinsForUser
        }
    })

    const {runContractFunction: addNakamotosToUser} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "addNakamotosToUser",
        params: {
            amount: nakamotosForUser
        }
    })

    const {runContractFunction: addUser} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "addUser",
        params: {}
    })

    const {runContractFunction: reset} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "reset",
        params: {}
    })

    const {runContractFunction: addLiquidity} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "addLiquidity",
        params: {
            amountNakamotos: nakamotosForDex,
            amountButerins: buterinsForDex,
        }
    })

    const {runContractFunction: swapButerins} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "swapButerins",
        params: {
            amount: buterinsForSwap
        }
    })

    const {runContractFunction: swapNakamotos} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "swapNakamotos",
        params: {
            amount: nakamotosForSwap
        }
    })
    //----------------------------------------------------------------------------------//



    //-------------------------------Notification Handlers------------------------------//
    const handleError = async function (tx){
        handleErrorNotification(tx)
    }

    const handleErrorNotification = function () {
        dispatch({
            type: "error",
            message: "Please Retry.",
            title: "That Didn't Work :(",
            position: "topR",
            icon: "bell",
        })
    }

    const handleTokensAddedSuccess = async function (tx){
        await tx.wait(1)
        handleTokensAddedNotification(tx)
    }
    
    const handleTokensAddedNotification = function () {
        dispatch({
            type: "success",
            message: "Tokens Added!",
            title: "Notification",
            position: "topR",
            icon: "check",
        })
    }

    const handleAddUserSuccess = async function (tx){
        await tx.wait(1)
        handleAddUserNotification(tx)
        document.getElementById("addUserButton").disabled = true;
    }
    
    const handleAddUserNotification = function () {
        dispatch({
            type: "success",
            message: "User Added!",
            title: "Notification",
            position: "topR",
            icon: "check",
        })
    }

    const handleSwapSuccess = async function (tx){
        await tx.wait(1)
        handleSwapNotification(tx)
    }
    
    const handleSwapNotification = function () {
        dispatch({
            type: "success",
            message: "Swap Confirmed!",
            title: "Notification",
            position: "topR",
            icon: "check",
        })
    }
    //----------------------------------------------------------------------------------//



    //----------------------------------Call Handlers--------------------------------//
    const getUserButerinsHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numUserButerins = await getUserButerinsBalance({
                onError: handleError
            })
            const numUserButerinsAsBigNumber = ethers.BigNumber.from(numUserButerins)
            setUserButerinsBalance(numUserButerinsAsBigNumber.toNumber());
        }
    }

    const getUserNakamotosHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numUserNakamotos = await getUserNakamotosBalance({
                onError: handleError
            })

            const numUserNakamotosAsBigNumber = ethers.BigNumber.from(numUserNakamotos)
            setUserNakamotosBalance(numUserNakamotosAsBigNumber.toNumber());
        }
    }

    const getButerinsHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numButerins = await getButerins({
                onError: handleError
            })

            const numButerinsAsBigNumber = ethers.BigNumber.from(numButerins)
            setDexButerinsBalance(numButerinsAsBigNumber.toNumber());
        }
    }

    const getNakamotosHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numNakamotos = await getNakamotos({
                onError: handleError
            })

            const numNakamotosAsBigNumber = ethers.BigNumber.from(numNakamotos)
            setDexNakamotosBalance(numNakamotosAsBigNumber.toNumber());
        }
    }

    const addButerinsToUserHandler = async (e) => {
        e.preventDefault()
        setButerinsForUser(document.getElementById("buterinsForUserInput").value)
        console.log(buterinsForUser)
        await addButerinsToUser({
            onSuccess: handleTokensAddedSuccess,
            onError: handleError
        })
    }

    const addNakamotosToUserHandler = async (e) => {
        e.preventDefault()
        setNakamotosForUser(document.getElementById("nakamotosForUserInput").value)
        console.log(nakamotosForUser)
        await addNakamotosToUser({
            onSuccess: handleTokensAddedSuccess,
            onError: handleError
        })
    }

    const addUserHandler = async (e) => {
        e.preventDefault()
        await addUser({
            onSuccess: handleAddUserSuccess,
            onError: handleError
        })
    }

    const resetHandler = async (e) => {
        e.preventDefault()
        await reset({
            onError: handleError
        })
    }

    const addLiquidityHandler = async (e) => {
        e.preventDefault()
        setNakamotosForDex(document.getElementById("nakamotosForDexInput").value)
        setButerinsForDex(document.getElementById("buterinsForDexInput").value)
        console.log(nakamotosForDex)
        console.log(buterinsForDex)
        await addLiquidity({
            onSuccess: handleTokensAddedSuccess,
            onError: handleError
        })
    }

    const swapButerinsHandler = async (e) => {
        e.preventDefault()
        setButerinsForSwap(document.getElementById("buterinsForSwapInput").value)
        console.log(buterinsForSwap)
        await swapButerins({
            onSuccess: handleSwapSuccess,
            onError: handleError
        })
    }

    const swapNakamotosHandler = async (e) => {
        e.preventDefault()
        setNakamotosForSwap(document.getElementById("nakamotosForSwapInput").value)
        console.log(nakamotosForSwap)
        await swapNakamotos({
            onSuccess: handleSwapSuccess,
            onError: handleError
        })
    }
    //----------------------------------------------------------------------------------//
    
//Baby Blue: 04ACB5
//Purple: 583a64
//Yellow: F78D04
//Orange: E24603
//Space Blue: 393C6F

    return (
      <div className="text-3xl grid gap-3 grid-rows-3 grid-cols-1 sm:grid-rows-1 sm:grid-cols-3 mt-32 justify-items-center justify-self-center" >
        <div className="bg-[#393C6F] text-center">
            <div>
                <button 
                    type="generic" 
                    onClick={resetHandler} 
                    className="bg-[#E24603] text-[#ffffff] font-oswald px-3 py-2 rounded-2xl mt-4 mb-12"
                >
                    Reset Simulation
                </button>
            </div>
            <div className=" m-2">
                <form onSubmit={addLiquidityHandler}>
                    <div>
                        <h2 className="font-oswald">Provide Liquidity to the Decentralized Exchange</h2>
                    </div>
                    <div>
                        <label>Buterins for DEX</label>
                        <input type="number" id="nakamotosForDexInput" placeholder="1" step="1"/>
                        <label>Nakamotos for DEX</label>
                        <input type="number" id="buterinsForDexInput" placeholder="2" step="1"/>
                    </div>
                    <div>
                        <button type="submit">Add Liquidity</button>
                    </div>
                </form>
            </div>
        </div>

        <div className="bg-[#F78D04] text-center">
            <h3>{`DEX Buterins: ${dexButerinsBalance}`}</h3>
                <button type="generic" onClick={getButerinsHandler}>Get DEXes Buterins</button>

            <h3>{`DEX Nakamotos: ${dexNakamotosBalance}`}</h3>
            <button type="generic" onClick={getNakamotosHandler}>Get DEXes Nakamotos</button>

            <form onSubmit={swapButerinsHandler}>
                <h2>Buterins for Nakamotos</h2>
                <input type="number" id="buterinsForSwapInput" placeholder="2" step="1"/>
                <button type="submit">Swap</button>
            </form>
            
            <form onSubmit={swapNakamotosHandler}>
                <h2>Nakamotos for Buterins</h2>
                <input type="number" id="nakamotosForSwapInput" placeholder="1" step="1"/>
                <button type="submit">Swap</button>
            </form>
        </div>
        
        <div className="bg-[#393C6F] text-center">
            <button 
                type="generic" 
                id="addUserButton" 
                onClick={addUserHandler}
                className="bg-[#E24603] text-[#ffffff] font-oswald px-3 py-2 rounded-2xl mt-4 mb-12"
            >
                    Add User
            </button>
            
            <h3>{`User Nakamotos: ${userButerinsBalance}`}</h3>
            <button type="generic" onClick={getUserButerinsHandler}>Get users Buterins</button>
            
            <h3>{`User Nakamotos: ${userNakamotosBalance}`}</h3>
            <button type="generic" onClick={getUserNakamotosHandler}>Get users Nakamotos</button>

            
            <h2 className="font-oswald">Provide Liquidity to the User</h2>
                    
            <form onSubmit={addButerinsToUserHandler}>
                <label>Buterins</label>
                <input type="number" id="buterinsForUserInput" placeholder="12" step="1"/>
                <button type="submit">Add Buterins</button>
            </form>

            <form onSubmit={addNakamotosToUserHandler}>
                <label>Nakamotos</label>
                <input type="number" id="nakamotosForUserInput" placeholder="13" step="1"/>
                <button type="submit">Add Nakamotos</button>
            </form>
        </div>
      </div>
    )
}