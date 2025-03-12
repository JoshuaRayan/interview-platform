import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation';
import React from 'react'
import { api } from '../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import MeetingModal from './MeetingModal';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

function EndCallButton() {
  const call=useCall()
  const router=useRouter();
  const {useLocalParticipant} = useCallStateHooks();
  const LocalParticipant=useLocalParticipant();

  const updateInterviewStatus=useMutation(api.interviews.updateInterviewStauts)
  const interview=useQuery(api.interviews.getInterviewByStreamCallId,{
    streamCallId:call?.id||"",

  })
  if(!call || !interview) return null

  const isMeetingOwner=LocalParticipant?.userId===call.state.createdBy?.id

  if(!isMeetingOwner) return null

  const endCall=async()=>{
    try{ 
        await call.endCall()
        await updateInterviewStatus({
            id:interview._id,
            status:"completed"
        })
        router.push("/")
        toast.success("Metting ended for everyone")

    }
    catch(error){
        console.log(error)
        toast.error("Failed to end meeting")
    }
  }

  return (
    <Button variant={'destructive'} onClick={endCall}>
        End Meeting
    </Button>
  )
}

export default EndCallButton