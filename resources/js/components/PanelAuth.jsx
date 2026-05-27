import SingleLogo from "@/assets/icon/SingleLogo";

const LeftPanel = ({ heading, paragraph }) => (
    <div className="auth-left hidden lg:flex">
        <div className="panel-blob float-el absolute -left-15 -top-15 h-55 55 bg-violet-400/60" />
        <div className="panel-blob float-el2 absolute -right-10 top-20 h-45 w-45 bg-blue-400/45" />
        <div className="panel-blob float-el absolute bottom-15 left-5 h-45 w-45 bg-amber-400/25 [animation-delay:1s]" />

        <div className="relative z-1">
            <div className="wariga-badge float-el2">
                <span className="text-sm">🌟</span>
                <span className="text-[11px] font-bold text-white/90">
                    Wariga-Powered
                </span>
            </div>
        </div>

        <div className="relative z-1 flex flex-1 items-center justify-center">
            <div className="spin-el absolute h-40 w-40 rounded-full border-2 border-dashed border-white/20" />

            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                <SingleLogo className="h-10 w-10" />
            </div>

            <div className="float-el absolute -top-5 right-2.5 rounded-[10px] border border-white/20 bg-white/15 px-3 py-1.5 backdrop-blur">
                <span className="text-[11px] font-bold text-white">✦ Adaptif</span>
            </div>

            <div className="float-el2 absolute -bottom-2.5 left-0 rounded-[10px] border border-amber-400/30 bg-amber-400/25 px-3 py-1.5 backdrop-blur">
                <span className="text-[11px] font-bold text-amber-200">✦ Personal</span>
            </div>

            <div className="float-el absolute bottom-7.5 -right-2.5 rounded-[10px] border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur [animation-delay:1.5s]">
                <span className="text-[11px] font-bold text-white">✦ Wariga</span>
            </div>
        </div>

        <div className="relative z-1">
            <p className="mb-1.5 text-xs font-medium text-white/60">
                {heading}
            </p>
            <h2 className="text-lg font-black leading-[1.4] text-white">
                {paragraph}
            </h2>
        </div>
    </div>
);

export default LeftPanel;
