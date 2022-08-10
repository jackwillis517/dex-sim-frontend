import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import { useNotification } from "@web3uikit/core"
import { ethers } from "ethers"

export default function Body() {
    //Header.jsx passes up metamask info to MoralisProvider which then passes it down to all
    //components inside the provider tags
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const dexSimAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [buterinsForUser, setButerinsForUser] = useState(0)
    const [nakamotosForUser, setNakamotosForUser] = useState(0)
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
    //----------------------------------------------------------------------------------//



    //----------------------------------Success Handlers--------------------------------//
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

    const handleButerinsAddedSuccess = async function (tx){
        await tx.wait(1)
        handleNewButerinsAddedNotification(tx)
    }
    
    const handleNewButerinsAddedNotification = function () {
        dispatch({
            type: "success",
            message: "Buterins Added!",
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
    //----------------------------------------------------------------------------------//



    //----------------------------------Call Handlers--------------------------------//
    const getUserButerinsHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numUserButerins = await getUserButerinsBalance({
                onSuccess: console.log("success"),
                onError: (error) => console.log(error)
            })

            const numUserButerinsAsBigNumber = ethers.BigNumber.from(numUserButerins)
            console.log(numUserButerinsAsBigNumber.toNumber());
        }
    }

    const getButerinsHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numButerins = await getButerins({
                onSuccess: console.log("success"),
                onError: (error) => console.log(error)
            })

            const numButerinsAsBigNumber = ethers.BigNumber.from(numButerins)
            console.log(numButerinsAsBigNumber.toNumber());
        }
    }

    const getNakamotosHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numNakamotos = await getNakamotos({
                onSuccess: console.log("success"),
                onError: (error) => console.log(error)
            })

            const numNakamotosAsBigNumber = ethers.BigNumber.from(numNakamotos)
            console.log(numNakamotosAsBigNumber.toNumber());
        }
    }
    
    const getUserNakamotosHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            const numUserNakamotos = await getUserNakamotosBalance({
                onSuccess: console.log("success"),
                onError: (error) => console.log(error)
            })

            const numUserNakamotosAsBigNumber = ethers.BigNumber.from(numUserNakamotos)
            console.log(numUserNakamotosAsBigNumber.toNumber());
        }
    }

    const addButerinsToUserHandler = async (e) => {
        e.preventDefault()
        setButerinsForUser(document.getElementById("buterinsForUserInput").value)
        console.log(buterinsForUser)
        await addButerinsToUser({
            onSuccess: handleButerinsAddedSuccess,
            onError: handleError
        })
    }

    const addNakamotosToUserHandler = async (e) => {
        e.preventDefault()
        setNakamotosForUser(document.getElementById("nakamotosForUserInput").value)
        console.log(nakamotosForUser)
        await addNakamotosToUser({
            onSuccess: console.log("success"),
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
    //----------------------------------------------------------------------------------//
    


    return (
      <div>
        <h1>Body</h1>
        <button type="generic" onClick={getButerinsHandler}>Number of DEXes Buterins</button>
        <br/>
        <br/>
        <button type="generic" onClick={getNakamotosHandler}>Number of DEXes Nakamotos</button>
        <br/>
        <br/>
        <button type="generic" onClick={getUserButerinsHandler}>Number of users Buterins</button>
        <br/>
        <br/>
        <button type="generic" onClick={getUserNakamotosHandler}>Number of users Nakamotos</button>
        <br/>
        <br/>
        <button type="generic" onClick={resetHandler}>Reset Simulation</button>
        <br/>
        <br/>
        <button type="generic" id="addUserButton" onClick={addUserHandler}>Add User</button>
        <form onSubmit={addButerinsToUserHandler}>
            <h2>Give Yourself Buterins</h2>
            <label>Add Buterins to User</label>
            <input type="number" id="buterinsForUserInput" placeholder="12" step="1"/>
            <button type="submit">Add Buterins</button>
        </form>
        <form onSubmit={addNakamotosToUserHandler}>
            <h2>Give Yourself Nakamotos</h2>
            <label>Add Nakamotos to User</label>
            <input type="number" id="nakamotosForUserInput" placeholder="13" step="1"/>
            <button type="submit">Add Nakamotos</button>
        </form>
        <form>
            <h2>Provide Liquidity to the Decentralized Exchange</h2>
            <label>Number of Buterins for DEX</label>
            <input type="number" id="nakamotosForDexInput" placeholder="1" step="1"/>
            <label>Number of Nakamotos for DEX</label>
            <input type="number" id="nakamotosForDexInput" placeholder="2" step="1"/>
            <button type="submit">Add Liquidity</button>
        </form>
      </div>
    )
}





// const handleDepositSuccess = async function (tx){
    //     await tx.wait(1)
    //     handleNewDepositNotification(tx)
    //     setTimeLocked(Date.now() + 30000);
    // }
    // const handleNewDepositNotification = function () {
    //     dispatch({
    //         type: "success",
    //         message: "Ether Deposited!",
    //         title: "Notification",
    //         position: "topR",
    //         icon: "check",
    //     })
    // }