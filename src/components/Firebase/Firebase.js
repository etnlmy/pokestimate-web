import firebase from "firebase";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    firebase.analytics();
    this.localStorage = window.localStorage;
    this.db = firebase.database();
    this.rooms = this.db.ref("rooms");
  }

  currentPlayerId = roomId => {
    const room = JSON.parse(this.localStorage.getItem(roomId));
    return room ? room.id : null;
  };

  currentPlayerName = roomId => {
    const room = JSON.parse(this.localStorage.getItem(roomId));
    return room ? room.name : null;
  };

  savePlayerNameLocally = (roomId, playerName) => {
    this.localStorage.setItem(roomId, JSON.stringify({ name: playerName }));
  };

  doesRoomExist = roomId => {
    return new Promise((resolve, reject) => {
      this.db
        .ref("rooms/" + roomId)
        .once("value")
        .then(room => {
          resolve(room.exists());
        })
        .catch(err => reject(err));
    });
  };

  updateCard = (roomId, cardValue) => {
    const currentPlayerId = this.currentPlayerId(roomId);
    return this.db
      .ref("rooms/" + roomId + "/players/" + currentPlayerId)
      .update({ card: cardValue });
  };

  startVotingPhase = roomId => {
    return new Promise((resolve, reject) => {
      const updates = {};
      this.db
        .ref("rooms/" + roomId + "/players")
        .once("value", players => {
          players.forEach(player => {
            updates[`rooms/${roomId}/players/${player.ref.key}/card`] = "";
          });
          this.db.ref().update(updates);
          resolve();
        })
        .catch(err => reject(err));
    });
  };

  createRoom = playerName => {
    return new Promise((resolve, reject) => {
      this.rooms
        .push({ createdAt: Date.now() })
        .then(room => {
          this.localStorage.setItem(
            room.key,
            JSON.stringify({ name: playerName })
          );
          resolve(room.key);
        })
        .catch(err => reject(err));
    });
  };

  subscribeToRoom = (roomId, callback) => {
    this.db.ref("rooms/" + roomId).on("value", room => {
      const players = Object.entries(room.val().players).map(([key, val]) => {
        return { id: key, ...val };
      });
      const data = { players: players };
      callback(data);
    });
  };

  unsubscribeFromRoom = roomId => {
    this.db.ref("rooms/" + roomId).off();
  };

  joinRoom = (roomId, playerName) => {
    return new Promise((resolve, reject) => {
      this.db
        .ref("rooms/" + roomId + "/players")
        .push({ name: playerName, card: "" })
        .then(player => {
          this.playerRef = player;
          this.playerRef.onDisconnect().remove();
          this.localStorage.setItem(
            roomId,
            JSON.stringify({ name: playerName, id: player.key })
          );
          resolve(player.key);
        })
        .catch(err => reject(err));
    });
  };
}

export default Firebase;
