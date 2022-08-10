import { ConnectButton } from "@web3uikit/web3"

export default function Header(){
    return (
        <div>
            <div>
                <ConnectButton moralistAuth={false} />
            </div>
            <div>
                <a href="https://jackwillis517.github.io/JacksWebsite/index.html">My Portfolio</a>
            </div>
        </div>
    )
}