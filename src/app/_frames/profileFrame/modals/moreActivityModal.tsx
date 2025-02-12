import { useDisclosure } from "@/hooks/useDisclosure";
import { useDevice } from "@/hooks/useDevice";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/languageContext";
import { useRouter } from "next/navigation";

import { Modal } from "@/components/ui/modal";
import { MdArrowBack, MdArrowForward, MdOutlineGroups } from "react-icons/md";
import { BiTrophy } from "react-icons/bi";
import { IoNewspaperOutline } from "react-icons/io5";
import { Achievement, ActivityData, ActivityType, Organization, Publication } from "@/types/activiities";

import activities from "@/data/activities.json";

export default function MoreActivityModal({ disclosure } : { disclosure: ReturnType<typeof useDisclosure> }) {

    const { device, isMobile, isTablet, isDesktop } = useDevice();
    const { language } = useLanguage();

    const [ index, setIndex ] = useState(0);
    const activitiesData = [
        {
            icon: <MdOutlineGroups size={18} />,
            type: "organization" as ActivityType,
            data: activities.organization[language] as ActivityData[]
        },
        {
            icon: <BiTrophy size={18} />,
            type: "achievement" as ActivityType,
            data: activities.achievement[language] as ActivityData[]
        },
        {
            icon: <IoNewspaperOutline size={18} />,
            type: "publication" as ActivityType,
            data: activities.publication[language] as ActivityData[]
        }
    ]

    useEffect(() => {
        setIndex(0);
    }, [device])

    return (
        <Modal 
            title={ language === "en" ? "More Activities" : "Kegiatan Lainnya" }
            size="4xl" placement="auto"
            {...disclosure}
        >
            <div className="flex flex-col gap-4">
                <div className={`grid ${isMobile ? 'grid-cols-1' : isTablet ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                    {/* Only show 1 if mobile, 2 if tablet, 3 if desktop */}
                    {activitiesData.splice(index, isMobile ? 1 : isTablet ? 2 : 3).map((data, index) => (
                        <ActivityColumn key={index} {...data} />
                    ))}
                </div>

                <div className={`grid grid-cols-2 gap-4 ${isDesktop && "hidden"}`}>
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-full disabled:bg-black/5 disabled:text-neutral-500"
                        onClick={() => setIndex(index - 1)} 
                        disabled={index === 0}
                    >
                        <MdArrowBack size={24} className="mx-auto" />
                    </button>
                    <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-full disabled:bg-black/5 disabled:text-neutral-700"
                        onClick={() => setIndex(index + 1)} 
                        disabled={index === activitiesData.length}
                    >
                        <MdArrowForward size={24} className="mx-auto" />
                    </button>
                </div>
            </div>
        </Modal>
    )
}


interface ActivityProps {
    icon: React.ReactNode;
    type: ActivityType;
    data: ActivityData[];
    maxItem?: number;
}

function ActivityColumn({ icon, type, data, maxItem = 5 } : ActivityProps) {

    const { language } = useLanguage();
    const router = useRouter();

    let totalitem = 0;
    const filteredData: ActivityData[] = []
    for (let activity of data) {
        if (totalitem >= maxItem) {
            break;
        };

        if ('positions' in activity) {
            if (totalitem + activity.positions.length > maxItem) {
                const remaining = maxItem - totalitem;
                filteredData.push({
                    ...activity,
                    positions: activity.positions.slice(0, remaining)
                })
                totalitem += remaining;
            } else {
                filteredData.push(activity);
                totalitem += activity.positions.length;
            }
        } else {
            filteredData.push(activity);
            totalitem++;
        }
    }

    if (type === "organization") {
        const org = filteredData as Organization[];
        return (
            <div className="flex flex-col">
                <div className="flex items-center gap-2 bg-blue-400 rounded-t-2xl p-3">
                    <div className="rounded-full p-2 bg-white text-neutral-700">
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{language === "en" ? "Organization" : "Organisasi"}</h3>
                </div>
                <div className="flex flex-col justify-between h-full rounded-b-2xl border-b-4 border-x-4 border-black/5 p-3">
                    <div className="flex flex-col gap-3">
                        {org.map((organization, index) => (
                            <OrganizationItem key={index} {...organization} />
                        ))}
                    </div>
                    {
                        totalitem >= maxItem && (
                            <button 
                                className="flex items-center gap-2 bg-blue-400/60 rounded-full py-2 px-6 mt-4 hover:bg-blue-400"
                                onClick={() => router.push("/activities/organization")}
                            >
                                <span className="text-white font-bold">{language === "en" ? "See More" : "Lihat Lebih Banyak"}</span>
                                <MdArrowForward size={24} className="text-white" />
                            </button>
                        )
                    }
                </div>
            </div>
        )
    } else if (type === "achievement") {
        const ach = filteredData as Achievement[];
        return (
            <div className="flex flex-col">
                <div className="flex items-center gap-2 bg-yellow-400 rounded-t-2xl p-3">
                    <div className="rounded-full p-2 bg-white text-neutral-700">
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{language === "en" ? "Achievement" : "Prestasi"}</h3>
                </div>
                <div className="flex flex-col justify-between h-full rounded-b-2xl border-b-4 border-x-4 border-black/5 p-3">
                    <div className="flex flex-col gap-3">
                        {ach.map((achievement, index) => (
                            <AchievementItem key={index} {...achievement} />
                        ))}
                    </div>
                    {
                        totalitem >= maxItem && (
                            <button 
                                className="flex items-center gap-2 bg-yellow-400/60 rounded-full py-2 px-6 mt-4 hover:bg-yellow-400"
                                onClick={() => router.push("/activities/achievement")}
                            >
                                <span className="text-white font-bold">{language === "en" ? "See More" : "Lihat Lebih Banyak"}</span>
                                <MdArrowForward size={24} className="text-white" />
                            </button>
                        )
                    }
                </div>
            </div>
        )
    } else {
        const pub = filteredData as Publication[];
        return (
            <div className="flex flex-col">
                <div className="flex items-center gap-2 bg-red-400 rounded-t-2xl p-3">
                    <div className="rounded-full p-2 bg-white text-neutral-700">
                        {icon}
                    </div>
                    <h3 className="text-lg font-bold text-white">{language === "en" ? "Publication" : "Publikasi"}</h3>
                </div>
                <div className="flex flex-col justify-between h-full rounded-b-2xl border-b-4 border-x-4 border-black/5 p-3">
                    <div className="flex flex-col gap-3">
                        {pub.map((publication, index) => (
                            <PublicationItem key={index} {...publication} />
                        ))}
                    </div>
                    {
                        totalitem >= maxItem && (
                            <button 
                                className="flex items-center gap-2 bg-red-400/60 rounded-full py-2 px-6 mt-4 hover:bg-red-400"
                                onClick={() => router.push("/activities/publication")}
                            >
                                <span className="text-white font-bold">{language === "en" ? "See More" : "Lihat Lebih Banyak"}</span>
                                <MdArrowForward size={24} className="text-white" />
                            </button>
                        )
                    }
                </div>
            </div>
        )
    }
}

function OrganizationItem({ name, year, startYear, endYear, positions } : Organization) {
    return (
        <div className="flex flex-col">
            <div className="flex flex-row gap-3">
                <div className="w-3 bg-black/5 rounded-lg"/>
                <div>
                    <h4 className="text-lg font-bold text-neutral-700">{name}</h4>
                    { positions.length === 1 &&<p className="text-sm text-neutral-500">{positions[0].position}</p> }
                    <p className="text-sm text-neutral-500">{startYear} - {endYear}</p>
                </div>
            </div>
            <div className="flex flex-col">
                {positions.length !== 1 && positions.map((position, index) => (
                    <div key={index} className="flex flex-row gap-3">
                        <div className="flex flex-col w-3 gap-1 items-center">
                            <div className="w-1 h-full bg-black/5 rounded-b-lg"/>
                            <div className="w-2 h-4 bg-black/5 rounded-lg" />
                            <div className={`w-1 h-full ${index === positions.length - 1 ? "" : "bg-black/5"}  rounded-t-lg`}/>
                        </div>
                        <div className={`flex flex-col mt-2 ${index === positions.length - 1 ? 'mb-2' : ''}`}>
                            <h5 className="text-md font-medium text-neutral-600 ">{position.position}</h5>
                            <p className="text-sm text-neutral-500 ">{position.startYear} - {position.endYear}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function AchievementItem({ name, year, level, description } : Achievement) {
    return (
        <div className="flex flex-row gap-3">
            <div className="w-3 bg-black/5 rounded-lg"/>
            <div>
                <h4 className="text-lg font-bold text-neutral-700">{name}</h4>
                <p className="text-sm text-neutral-500">{level}</p>
                <p className="text-sm text-neutral-500">{year}</p>
            </div>
        </div>
    )
}

function PublicationItem({ name, year, abstract } : Publication) {
    return (
        <div className="flex flex-row gap-3">
            <div className="w-3 bg-black/5 rounded-lg"/>
            <div>
                <h4 className="text-lg font-bold text-neutral-700">{name}</h4>
                <p className="text-sm text-neutral-500">{year}</p>
            </div>
        </div>
    )
}