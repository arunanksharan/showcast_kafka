export async function updateRoomStatusOnLeave(roomId: string) {
  console.log('RoomId from updateRoomStatus', roomId);
  if (!roomId) return;
  const response = await fetch('https://cast.show/api/room/update', {
    method: 'POST',
    body: JSON.stringify({ roomId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log('Data from updateRoomStatus', data);
}
