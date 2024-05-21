import { Image } from 'react-native'
import React, { useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MessageIcon from '../svgIcons/MessageIcon'
import { Server } from '../../models/Server';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServers } from '../../store/serverSlice';

const ServerList = () => {
      const listServer: Server[] = useSelector((state: any) => state.server.Servers);
      const dispatch = useDispatch<any>();
      useEffect(() => {
            dispatch(fetchServers());
      }, [])

      return (
            listServer?.length > 0 &&
            listServer.map((section: Server) => (
                  <TouchableOpacity key={section.name} className='items-center justify-center w-11 h-11 rounded-full bg-[#2c2f33] mb-2' >
                        {section.image ? (
                              <Image source={{ uri: section.image }} className='w-10 h-10 rounded-full' />
                        ) : (
                              <MessageIcon width={25} height={25} fill="white" />
                        )}
                  </TouchableOpacity>
            ))
      )
}

export default ServerList