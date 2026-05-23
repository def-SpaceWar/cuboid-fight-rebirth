import { joinRoom, selfId, type JoinRoomConfig } from "trystero";

const config: JoinRoomConfig = {
    appId: "cuboid-fight-rebirth",
};

const room = joinRoom(config, "def_SpaceWar's Lobby");
console.log(selfId);

// some sort of Lobby.svelte component to handle initial lobby stuff
