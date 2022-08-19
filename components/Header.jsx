import { ConnectButton } from "@web3uikit/web3"

//Baby Blue: 04ACB5
//Purple: 710538
//Yellow: F78D04
//Orange: E24603
//Space Blue: 393C6F

export default function Header(){
    return (
        <div className="bg-[#04ACB5] grid grid-cols-2 pb-2 justify-items-center">
            <div className="mt-3 mr-2 justify-self-end">
                <a 
                href="https://jackwillis517.github.io/JacksWebsite/portfolio.html"
                className="bg-slate-100 font-bold text-[#E24603] rounded-2xl px-4 py-2  hover:ring-1 hover:ring-[#FF7324] hover:ring-offset-2 hover:text-zinc-500 active:scale-90"
                >
                My Portfolio
                </a>
            </div>
            <div className="pt-1 justify-self-start">
                <ConnectButton moralistAuth={false} />
            </div>
        </div>
    )
}