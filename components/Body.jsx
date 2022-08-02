import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useState } from "react"
import { useNotification } from "web3uikit"

export default function Body() {
    //Header.jsx passes up metamask info to MoralisProvider which then passes it down to all
    //components inside the provider tags
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const timeVaultAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [depositAmount, setDepositAmount] = useState(0)
    const dispatch = useNotification()
    var timeLeft

    // const {runContractFunction: increaseTime} = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: timeVaultAddress,
    //     functionName: "increaseTime",
    //     params: {timeToAdd}
    // })

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

    // const depositHandler = async (e) => {
    //     e.preventDefault()
    //     if(typeof window != "undefined"){
    //         var amount = document.getElementById("etherAmount").value
    //         setDepositAmount(amount * 1000000000000000000)
    //         await deposit({
    //             onSuccess: handleDepositSuccess,
    //             onError: handleError
    //         })
    //     }
    // }


    return (
      <div>
        <h1>Body</h1>
      </div>
    )
}