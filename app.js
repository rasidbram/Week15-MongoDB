const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "infoDB";

// Create a new MongoClient
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use connect method to connect to the Server

client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    updateDocument(db, function() {
      removeDocument(db, function() {
        client.close();
      });
    });
  });
});

const insertDocuments = function (db, callback) {
  // Get the documents collection
  const collection1 = db.collection("Locations");
  // Insert some documents
  collection1.insertMany([{
      Name: 'jack',
      ShortName: 'fire',
      City: 'birmingham',
      Country: 'england',
      Coordinates: 626.7474
    },
    {
      Name: 'emma',
      ShortName: 'stone',
      City: 'southampton',
      Country: 'england',
      Coordinates: 6382.3838
    },
    {
      Name: 'David',
      ShortName: 'losalt',
      City: 'newcastle',
      Country: 'england',
      Coordinates: 74747.9272
    },
    {
      Name: 'sawyer',
      ShortName: 'bright',
      City: 'reading',
      Country: 'england',
      Coordinates: 3436382.3838
    },
    {
      Name: 'kalina',
      ShortName: 'alliy',
      City: 'manchester',
      Country: 'england',
      Coordinates: 33466.3838
    },

  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    console.log("Inserted 3 documents into the Location");
    callback(result);
  });

  // Get the documents collection
  const collection2 = db.collection("Title");
  // Insert some documents
  collection2.insertMany([{
      album: 'magic',
      location: 'france',
      member: 'yes',
      viewcount: 266273,
      uploaddate: '23April09',
      privacytype: 'yes'
    },
    {
      album: 'destiny',
      location: 'scotland',
      member: 'yes',
      viewcount: 384848,
      uploaddate: '23June19',
      privacytype: 'yes'
    },
    {
      album: 'best ever heard',
      location: 'ireland',
      member: 'yes',
      viewcount: 7383838,
      uploaddate: '23May20',
      privacytype: 'no'
    },

  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the Title");
    callback(result);
  });

  // Get the documents collection
  const collection3 = db.collection("Album");
  // Insert some documents
  collection3.insertMany([{
      title: 'Bird',
      description: 'good',
      viewcount: 4343
    },
    {
      title: 'Wolf',
      description: 'verygood',
      viewcount: 454354
    },
    {
      title: 'Dog',
      description: 'best',
      viewcount: 67654565
    }

  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the Album");
    callback(result);
  });

  // Get the documents collection
  const collection4 = db.collection("Member");
  // Insert some documents
  collection4.insertMany([{
      ID: 37373784994,
      Name: 'Lois',
      PhoneNumber: 03737355263,
      Email: 'lois@gmailcom',
      Address: '????'
    },
    {
      ID: 737378393,
      Name: 'karl',
      PhoneNumber: 05543456032,
      Email: 'karl@gmail.com',
      Address: '????'
    },
    {
      ID: 34567876543,
      Name: 'tony',
      PhoneNumber: 02345432345,
      Email: 'tony@gmail.com',
      Address: '????'
    },
    {
      ID: 3456765678987,
      Name: 'asley',
      PhoneNumber: 0454343456,
      Email: 'asley@gmail.com',
      Address: '????'
    },
    {
      ID: 345677876545,
      Name: 'adrian',
      PhoneNumber: 03232334546,
      Email: 'adr@gamail.com',
      Address: '???'
    },

  ], function (err, result) {
    assert.equal(err, null);
    assert.equal(5, result.result.n);
    assert.equal(5, result.ops.length);
    console.log("Inserted 5 documents into the Member");
    callback(result);
  });
  
};



// *****************************************************
// Update one of the already created Album
const updateDocument = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('Album');
  // Update document where Title is Dog, set b equal to 1
  collection.updateOne(
    {title:'Dog'},
    {$set:{title:'shark'}},function (err, result) {
          assert.equal(err, null);
          // assert.equal(0, result.result.n);
          console.log("Updated in Album");
          callback(result);
      });
};
// ************************************************
//  Delete one of the already created Member
const removeDocument = function (db, callback) {
  // Get the documents collection
  const collection = db.collection('Member');
  // Delete document where email is ....
  collection.deleteOne(
    {Name: 'asley'}, function (err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed in Member");
      callback(result);
  });
};