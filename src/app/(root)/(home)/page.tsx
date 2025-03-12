"use client";
import ActionCard from "@/components/ActionCard";
import { QUICK_ACTIONS } from "@/constants";
import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { handleClientScriptLoad } from "next/script";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MeetingPage from "../meeting/[id]/page";
import MeetingModal from "@/components/MeetingModal";
import LoaderUI from "@/components/ui/LoaderUI";

export default function Home() {
  const router = useRouter();
  const { isInterviewer, isCandidate , isLoading} = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();



  const handleQuickAction=(title:string)=>{
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };
  

  if(isLoading) return <LoaderUI/>

  return (
  <div className="container max-w-7xl mx-auto p-6">
    {/* WELCOME */}
    <div className="rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 p-6 border shadow-md mb-10 dark:from-gray-900 dark:to-gray-800">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-300 to-purple-100 bg-clip-text text-transparent font-serif dark:from-purple-400 dark:to-indigo-300">
          Welcome back!
        </h1>
        <p className="text-white mt-2 text-lg font-light dark:text-gray-300">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUICK_ACTIONS.map((action,index)=>(
            <ActionCard
              key={action.title}
              action={action}
              onClick={()=>handleQuickAction(action.title)}

            />
          ))}
        </div>
        <MeetingModal
          isOpen={showModal}
          onClose={()=> setShowModal(false)}
          title={modalType==="join" ? "Join Meeting":"Start Meeting"}
          isJoinMeeting={modalType==="join"}
          />
        </>
      ) :(
        <>
        <div>
          candidate view goes here

        </div>
        </>
      )}
      
  </div>
  );
}


