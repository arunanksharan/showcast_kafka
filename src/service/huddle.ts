import { supabase } from './supabaseClient';

export const createHuddleRoom = async () => {
  const response = await fetch('https://api.huddle01.com/api/v1/create-room', {
    method: 'POST',
    body: JSON.stringify({
      title: 'Huddle01 Room',
    }),
    headers: {
      'Content-type': 'application/json',
      'x-api-key': process.env.HUDDLE_API_KEY || '',
    },
  });
  const data = await response.json();
  const roomId = data.data.roomId;
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log('xxxxxxxxxx Huddle New Room Id - Start xxxxxxxxxx');
  console.log(`Newly Created RoomId Is :: ${roomId}`);
  console.log('xxxxxxxxxx Huddle New Room Id - End xxxxxxxxxx');
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  return roomId;
};

export const updateSupabaseWithHuddleRoom = async (roomId: string) => {
  const { data: newRoom, error } = await supabase.from('rooms').insert([
    {
      huddle_room_id: roomId,
      host_is_joined: true,
      peer_is_joined: false,
    },
  ]);

  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log('Newly created RoomId after Supabase insertion', roomId);
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
};

export const updateSupabaseHostIsJoined = async (roomId: string) => {
  const { data: existingRoom, error } = await supabase
    .from('rooms')
    .update([
      {
        host_is_joined: true,
      },
    ])
    .eq('huddle_room_id', roomId)
    .select();

  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log('xxxxxxxxxx Huddle HOST_JOINED Id - Start xxxxxxxxxx');
  console.log(`Updated Existing RoomId Is :: ${roomId}`);
  console.log('xxxxxxxxxx Huddle HOST_JOINED Id - End xxxxxxxxxx');
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
};

export const updateSupabaseHostAndPeerIsJoined = async (roomId: string) => {
  const { data: existingRoom, error } = await supabase
    .from('rooms')
    .update([
      {
        peer_is_joined: true,
      },
    ])
    .eq('huddle_room_id', roomId)
    .select();

  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log('xxxxxxxxxx Huddle HOST_PEER_JOINED Id - Start xxxxxxxxxx');
  console.log(`Updated Existing RoomId Is :: ${roomId}`);
  console.log('xxxxxxxxxx Huddle HOST_PEER_JOINED Id - End xxxxxxxxxx');
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
};

export const updateSupabaseUserRoom = async (roomId: string, fc_id: string) => {
  const { data: newUserRoom, error } = await supabase
    .from('user_room')
    .upsert({
      id: fc_id,
      huddle_room_id: roomId,
    })
    .select();
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log('xxxxxxxxxx Huddle USER-ROOM Id - Start xxxxxxxxxx');
  console.log(`Updated User-Room Is :: ${fc_id}::::${roomId}`);
  console.log('xxxxxxxxxx Huddle USER-ROOM Id - End xxxxxxxxxx');
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
};
