const ProfileCard = ({ user }) => {
    const initial = user?.name?.charAt(0)?.toUpperCase() ?? "W";
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div>
                    <div className="w-10 h-10 rounded-full mx-auto overflow-hidden ring-4 ring-(--theme-soft)">
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: "var(--theme-gradient)" }}
                        >
                            <span className="text-white text-2xl font-bold">
                                {initial}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h2 className="font-bold text-gray-800">
                        {user?.fullname ?? user?.name ?? "Pelajar"}
                    </h2>
                    <h4 className="text-sm font-light text-gray-800">
                        Sang Pelajar
                    </h4>
                </div>
            </div>
        </div>
    );
};


export default ProfileCard;
