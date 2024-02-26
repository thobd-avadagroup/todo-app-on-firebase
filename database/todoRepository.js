const {FieldValue} = require("firebase-admin/firestore");
const db = require("./firestoreConnection");

const collectionName = "todos";

async function getAll() {
  const queryResult = await db.collection(collectionName).get();
  return queryResult.docs.map((item) => {
    return {id: item.id, ...item.data()};
  });
}

async function getOne(id) {
  const document = await db.collection(collectionName)
      .doc(id)
      .get();

  if (document.exists) {
    return document.data();
  } else {
    throw new Error("No such entity!");
  }
}

async function save(data) {
  await db.collection(collectionName).add(
      {
        ...data,
        isCompleted: data.isCompleted !== undefined ? data.isCompleted : false,
        createdAt: FieldValue.serverTimestamp(),
      },
  );
}

async function update(id, data) {
  const document = await db.collection(collectionName)
      .doc(id)
      .get();

  if (document.exists) {
    await db.collection(collectionName)
        .doc(id)
        .update({
          ...document.data(),
          ...data,
          updatedAt: FieldValue.serverTimestamp(),
        });
  } else {
    throw new Error("No such entity!");
  }
}

async function remove(id) {
  await db.collection(collectionName).doc(id).delete();
}

module.exports = {
  getAll,
  getOne,
  save,
  update,
  remove,
};
