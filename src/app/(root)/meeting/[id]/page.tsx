"use client";

import React, { useState } from 'react'
import { useParams } from 'next/navigation' 
import { useUser } from '@clerk/nextjs'
import LoaderUI from '@/components/ui/LoaderUI'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'

import MeetingRoom from '@/components/MeetingRoom'
import useGetCallById from '@/hooks/useGetCallById'
import MeetingSetup from '@/components/MeetingSetup';
function MeetingPage() {
  
  const{id}=useParams()
  const{isLoaded}=useUser()
  const {call,isCallLoading}=useGetCallById(id)
 

  const [isSetupComplete, setIsSetupComplete]=useState(false);
  if(!isLoaded || isCallLoading) return <LoaderUI/>

  if (!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    );
  }

  return(
  <StreamCall call={call}>
    <StreamTheme>
      {!isSetupComplete? (
        <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)}/>
      ) : (
      <MeetingRoom/>
      )}

    </StreamTheme>

  </StreamCall>
  );
}

export default MeetingPage;