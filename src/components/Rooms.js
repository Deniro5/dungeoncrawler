const rooms = [];

//We store the initial positions of each object within a room in an array

const initializeRoom = () => {
  let newBoard = [];
  let count = 0;
  while (count < 50) {
    let count1 = 0;
    var newRow = [];
    while (count1 < 100) {
      newRow.push({});
      count1++;
    }
    newBoard.push(newRow);
    count++;
  }
  return newBoard;
};

let room1 = initializeRoom();
//Walls
let index = 49;
while (index > 40) {
  room1[1][index] = { name: "wall" };
  room1[10][index] = { name: "wall" };
  room1[14][index] = { name: "wall" };
  room1[18][index] = { name: "wall" };
  room1[20][index] = { name: "wall" };
  room1[24][index] = { name: "wall" };
  index--;
}
room1[10][49] = {};
index = 1;
while (index < 10) {
  room1[index][41] = { name: "wall" };
  room1[index][33] = { name: "wall" };
  room1[index][10] = { name: "wall" };
  index++;
}
while (index < 25) {
  room1[index][33] = { name: "wall" };
  room1[index][10] = { name: "wall" };
  index++;
}
room1[0][10] = { name: "wall" };
room1[5][10] = {};

//Items
room1[10][25] = { name: "chestclosed", item: "ammo" };
room1[16][49] = { name: "chestclosed", item: "ammo" };
room1[22][49] = { name: "chestclosed", item: "ammo" };
room1[0][5] = { name: "chestclosed", item: "ammo" };
room1[5][45] = { name: "chestclosed", item: "heart" };
room1[0][49] = { name: "chestclosed", item: "key" };
room1[22][5] = { name: "ladder", room: 1, start: [12, 48] };
room1[22][40] = { name: "ladder", room: 2, start: [20, 45] };

//Monsters
room1[10][24] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room1[10][49] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room1[24][37] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 0,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room1[5][10] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room1[0][33] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room1[1][0] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room1[17][0] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room1[16][34] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 0,
  monsterHit: false,
  chasing: false,
  timer: false,
};

rooms.push(room1);

//------------------------------------------------------

let room2 = initializeRoom();
//Walls
index = 0;
while (index < 25) {
  room2[index][10] = { name: "wall" };
  room2[index][35] = { name: "wall" };
  index++;
}
room2[0][35] = {};
room2[1][35] = {};
room2[2][35] = {};
room2[24][35] = {};
index = 0;
while (index < 35) {
  room2[8][index] = { name: "wall" };
  room2[16][index] = { name: "wall" };
  index++;
}
room2[4][10] = {};
room2[12][10] = {};
room2[20][10] = {};
room2[8][5] = {};
room2[16][2] = {};
index = 35;
while (index < 50) {
  room2[1][index] = { name: "wall" };
  room2[23][index] = { name: "wall" };
  index++;
}

//Items

room2[3][5] = { name: "chestclosed", item: "ammo" };
room2[12][5] = { name: "chestclosed", item: "heart" };
room2[21][5] = { name: "chestclosed", item: "ammo" };
room2[3][22] = { name: "chestclosed", item: "ammo" };
room2[12][22] = { name: "chestclosed", item: "ammo" };
room2[21][22] = { name: "chestclosed", item: "ammo" };
room2[0][49] = { name: "chestclosed", item: "heart" };
room2[24][49] = { name: "chestclosed", item: "key" };
room2[12][48] = { name: "ladder", room: 0, start: [22, 5] };

//Monsters

room2[8][5] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 0,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[16][2] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[9][24] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[2][42] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[24][35] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[4][10] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[12][10] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[20][10] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room2[0][35] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 1,
  monsterHit: false,
  chasing: false,
  timer: false,
};

rooms.push(room2);

//-------------------------

let room3 = initializeRoom();
index = 0;
while (index < 40) {
  room3[5][index] = { name: "wall" };
  index++;
}
index = 5;
while (index < 25) {
  room3[index][10] = { name: "wall" };
  room3[index][20] = { name: "wall" };
  room3[index][40] = { name: "wall" };
  index++;
}
room3[6][40] = {};
room3[6][20] = {};
room3[24][20] = {};
room3[15][10] = {};
index = 0;
while (index < 50) {
  room3[0][index] = { name: "doorwall" };
  index++;
}
room3[0][24] = { name: "doorwall" };
room3[0][25] = { name: "door" };
room3[0][26] = { name: "doorwall" };

//Items
room3[1][1] = { name: "chestclosed", item: "ammo" };
room3[3][1] = { name: "chestclosed", item: "heart" };
room3[8][16] = { name: "chestclosed", item: "ammo" };
room3[22][16] = { name: "chestclosed", item: "ammo" };
room3[15][35] = { name: "chestclosed", item: "ammo" };
room3[7][4] = { name: "chestclosed", item: "key" };
room3[23][4] = { name: "chestclosed", item: "ammo" };
room3[20][45] = { name: "ladder", room: 0, start: [22, 40] };

//Monsters

room3[9][4] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};

room3[21][4] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 0,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room3[24][16] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room3[6][16] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room3[2][5] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room3[1][42] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room3[15][30] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room3[15][10] = {
  name: "monster",
  monsterStatus: ["idle", 0],
  monsterFrame: 0,
  monsterDirection: 0,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};
room3[1][20] = {
  name: "monster",
  monsterStatus: ["vertidle", 0],
  monsterFrame: 1,
  monsterDirection: 180,
  monsterHealth: 4,
  monsterRoom: 2,
  monsterHit: false,
  chasing: false,
  timer: false,
};

rooms.push(room3);

export default rooms;
