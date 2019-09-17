var express = require("express");
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

//------------------------------------------------------------------------------------------------
// CONFIGURATIONS
//------------------------------------------------------------------------------------------------


//Conf for sending access contro allow headers
router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.use(express.json());

//const url = process.env.MONGOLAB_URI;
const url = "mongodb://localhost:27017/nombreDB";

//------------------------------------------------------------------------------------------------
// CALLBACKS
//------------------------------------------------------------------------------------------------

function postCallBack(item, resolve, reject) {
  const client = new MongoClient(url);
  let promise1 = client.connect();

  promise1.then(() => {

    const db = client.db("nombreDB");
    const col = db.collection("nombreCol");

    let promise2 = col.insertOne(item);
    promise2.then((res) => {
      client.close();
      resolve(res);
    });
    promise2.catch((err) => reject(err));
  });
}

function getCallBack(resolve, reject) {
  const client = new MongoClient(url);
  let promise1 = client.connect();

  promise1.then(() => {

    const db = client.db("nombreDB");
    const col = db.collection("nombreCol");

    let promise2 = col.find({}).toArray();
    promise2.then((items) => {
      client.close();

      resolve(items);
    });
    promise2.catch((err) => reject(err));
  });
}

function getByIdCallBack(id, resolve, reject) {
  const client = new MongoClient(url);
  let promise1 = client.connect();

  promise1.then(() => {

    const db = client.db("nombreDB");
    const col = db.collection("nombreCol");

    let o_id = new ObjectID(id);

    let promise2 = col.findOne({ "_id": o_id });
    promise2.then((item) => {
      client.close();

      resolve(item);
    });
    promise2.catch((err) => reject(err));
  });
}

function putCallBack(id, obj, resolve, reject) {
  const client = new MongoClient(url);
  let promise1 = client.connect();

  promise1.then(() => {

    const db = client.db("nombreDB");
    const col = db.collection("nombreCol");

    let o_id = new ObjectID(id);
    col.updateOne({ _id: o_id }, { $set: obj }, (err, res) => {
      if (err) {
        reject(res);
      }
      client.close();
      resolve(res);
    });
  });
}

function deleteCallBack(id, obj, resolve, reject) {
  const client = new MongoClient(url);
  let promise1 = client.connect();

  promise1.then(() => {

    const db = client.db("nombreDB");
    const col = db.collection("nombreCol");

    let o_id = new ObjectID(id);
    col.deleteOne({ _id: o_id }, (err, res) => {
      if (err) {
        reject(res);
      }
      client.close();
      resolve(res);
    });
  });
}

//------------------------------------------------------------------------------------------------
// SERVICES
//------------------------------------------------------------------------------------------------
router.get("/", (req, res) => {
  getCallBack(
    (items) => res.json(items),
    (err) => res.json(err)
  );
});

router.get("/:itemId", (req, res) => {
  let params = req.params;
  getByIdCallBack(
    params.itemId,
    (res2) => res.json(res2),
    (err) => res.json(err)
  );
});

router.post("/", (req, res) => {
  let body = req.body;
  postCallBack(body,
    (res2) => res.json(res2),
    (err) => res.json(err)
  );
});

router.put("/:itemId", (req, res) => {
  let params = req.params;
  let body = req.body;

  putCallBack(params.itemId, body,
    (res2) => res.json(res2),
    (err) => res.json(err)
  );
});

router.delete("/:itemId", (req, res) => {
  let params = req.params;
  deleteCallBack(params.itemId,
    (res2) => res.json(res2),
    (err) => res.json(err)
  );
});

module.exports = router;