const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://onsy:onsy_123456@cluster0.wei01pb.mongodb.net/onsy";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('onsy');
    const auths = db.collection('auths'); 
    
    const result = await auths.updateOne(
      { email: 'testuser999@onsy.com' },
      { $set: { isVerified: true } }
    );
    console.log("Verified user:", result.modifiedCount);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
