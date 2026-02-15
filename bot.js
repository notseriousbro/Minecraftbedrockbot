const bedrock = require('bedrock-protocol');
const { Vec3 } = require('vec3');

const client = bedrock.createClient({
  host: 'nl-01.freezehost.pro',
  port: 10469,
  username: 'Notch',
  offline: true
});

client.on('connect', () => {
  console.log('Connected to the server');
  // Start performing actions
  breakBlock(new Vec3(10, 4, 10)); // Example: break a block at coordinates (10, 4, 10)
  buildHouse(new Vec3(15, 4, 15)); // Example: build a house starting at coordinates (15, 4, 15)
});

client.on('disconnect', () => {
  console.log('Disconnected from the server');
});

client.on('error', (error) => {
  console.error('An error occurred:', error);
});

function breakBlock(position) {
  client.once('block_update', ({ position, type }) => {
    // Check if the block at the given position is breakable
    if (type !== 0) {
      console.log('Breaking block at position:', position);
      client.dig(position);
    } else {
      console.log('Cannot break block at position:', position);
    }
  });

  client.updateBlock(position);
}

function placeBlock(position, materialType) {
  console.log('Placing block at position:', position);
  client.setBlock(position, materialType);
}

function buildHouse(startPosition) {
  const houseSize = 5; // Size of the house (5x5x5)
  const materialType = 1; // Example: using stone blocks

  for (let x = startPosition.x; x < startPosition.x + houseSize; x++) {
    for (let y = startPosition.y; y < startPosition.y + houseSize; y++) {
      for (let z = startPosition.z; z < startPosition.z + houseSize; z++) {
        const position = new Vec3(x, y, z);
        placeBlock(position, materialType);
      }
    }
  }
}
