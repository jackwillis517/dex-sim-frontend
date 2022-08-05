import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import { useNotification } from "web3uikit"
import { ethers } from "ethers"

export default function Body() {
    //Header.jsx passes up metamask info to MoralisProvider which then passes it down to all
    //components inside the provider tags
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const dexSimAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [userAddress, setUserAddress] = useState('')
    const [fundingForUser, setFundingForUser] = useState(0)
    const [typeOfFundingForUser, setTypeOfFundingForUser] = useState('')
    const [typeOfBalance, setTypeOfBalance] = useState('')
    const dispatch = useNotification()

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

    const {runContractFunction: addUser} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "addUser",
        params: {userAddress}
    })

    const {runContractFunction: fundUser} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "fundUser",
        params: {typeOfFundingForUser, fundingForUser}
    })

    const {runContractFunction: getUserBalance} = useWeb3Contract({
        abi: abi,
        contractAddress: dexSimAddress,
        functionName: "getUserBalance",
        params: {typeOfBalance}
    })

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

    const getUserHandler = async (e) => {
        e.preventDefault()
        console.log(userAddress);
    }

    const getUserBalanceHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            var type = document.getElementById("userFundsType").value
            setTypeOfBalance(type)
            const fundsAmount = await getUserBalance({
                onSuccess: console.log("success"),
                onError: (error) => console.log(error)
            })

            
            console.log(fundsAmount);
        }
    }

    const addNewUserHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            var address = document.getElementById("addressInput").value
            setUserAddress(address)
            await addUser({
                onSuccess: console.log("success"),
                onError: (error) => console.log(error)
            })
        }
    }

    const fundUserHandler = async (e) => {
        e.preventDefault()
        if(typeof window != "undefined"){
            var amount = document.getElementById("fundUserInput").value
            var type = document.getElementById("fundingTypeInput").value
            setFundingForUser(amount)
            setTypeOfFundingForUser(type)
            await fundUser({
                onSuccess: console.log("success"),
                onError: (error) => console.log(error)
            })
        }
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


    return (
      <div>
        <h1>Body</h1>
        <button type="generic" onClick={getButerinsHandler}>Get Buterins</button>
        <button type="generic" onClick={getNakamotosHandler}>Get Nakamotos</button>
        <form onSubmit={addNewUserHandler}>
            <input type="text" id="addressInput" placeholder="0x4b2r....o92e5a"></input>
            <button type="submit">Add User</button>
        </form>
        <button type="generic" onClick={getUserHandler}>Current User</button>
        <form onSubmit={fundUserHandler}>
            <input type="number" id="fundUserInput" placeholder="3"></input>
            <input type="text" id="fundingTypeInput" placeholder="Nakamotos"></input>
            <button type="submit">Fund User</button>
        </form>
        <form onSubmit={getUserBalanceHandler}>
            <input type="text" id="userFundsType" placeholder="Buterins"></input>
            <button type="submit">Get User Funds</button>
        </form>
      </div>
    )
}