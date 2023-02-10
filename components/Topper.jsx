//Baby Blue: 04ACB5
//Purple: 583a64
//Yellow: F78D04
//Orange: E24603
//Space Blue: 393C6F

export default function Topper() {
  return (
    <div className="bg-[#F78D04] shadow-xl mt-10 pt-5 grid grid-rows-2 grid-cols-1 justify-items-center justify-self-center">
      <div className="font-zen text-8xl text-[##E24603]">
        <h1>DEX SIM</h1>
      </div>
      <div className="font-monda flex flex-row pt-5 justify-content-center">
        <div className="mr-16">
          <h2 className="bg-[#04ACB5] text-[#583a64] text-2xl px-5 py-2 rounded-3xl">
            Automated Market Maker
          </h2>
        </div>
        <div>
          <h2 className="bg-[#583a64] text-[#F78D04] text-2xl px-5 py-2 rounded-3xl">
            Decentralized Exchanges
          </h2>
        </div>
        <div className="ml-16">
          <h2 className="bg-[#E24603] text-[#ffffff] text-2xl px-5 py-2 rounded-3xl">
            Liquidity Pools
          </h2>
        </div>
      </div>
    </div>
  );
}
