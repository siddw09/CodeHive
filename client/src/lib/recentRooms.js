const RECENT_ROOMS_KEY = 'codehive-recent-rooms';
const CURRENT_ROOM_KEY = 'codehive-current-room';

export function getRecentRooms() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_ROOMS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function rememberRoom(room) {
  if (!room?._id) return;

  const nextRoom = {
    _id: room._id,
    title: room.title,
    language: room.language,
    code: room.code || '',
  };

  const recentRooms = getRecentRooms()
    .filter((item) => item._id !== room._id);

  localStorage.setItem(
    RECENT_ROOMS_KEY,
    JSON.stringify([nextRoom, ...recentRooms].slice(0, 3))
  );
}

export function setCurrentRoomSnapshot(room) {
  if (!room?._id) return;
  localStorage.setItem(CURRENT_ROOM_KEY, JSON.stringify(room));
}

export function getCurrentRoomSnapshot() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_ROOM_KEY) || 'null');
  } catch {
    return null;
  }
}
