import { ConnectButton } from "@web3uikit/web3";

//Baby Blue: 04ACB5
//Purple: 710538
//Yellow: F78D04
//Orange: E24603
//Space Blue: 393C6F

export default function Header() {
  return (
    <div className="bg-[#04ACB5] flex flex-row pb-2 justify-center pl-12">
      <div className="mt-3 mr-2">
        <a
          href="https://jackwillis.netlify.app/"
          className="bg-slate-100 font-bold text-[#E24603] rounded-2xl px-5 py-2.5  hover:text-[#c23e06]"
        >
          My Portfolio
        </a>
      </div>
      <div className="pt-1">
        <ConnectButton moralistAuth={false} />
      </div>
    </div>
  );
}
