const { MilvusClient } = require('@zilliz/milvus2-sdk-node');
const dotenv = require('dotenv');
dotenv.config();

//     // /**
//     //  * Creates a new instance of MilvusClient.
//     //  * @param configOrAddress The Milvus server's address or client configuration object.
//     //  * @param ssl Whether to use SSL or not.
//     //  * @param username The username for authentication.
//     //  * @param password The password for authentication.
//     //  * @param channelOptions Additional channel options for gRPC.
// const config = {
// }
console.log('MILVUS_URL', process.env.MILVUS_URL);
const milvusClient = new MilvusClient(process.env.MILVUS_URL);
const collectionManager = milvusClient.collectionManager;
// const collectionName = 'my_text_collection'
async function dataBaseOperate() {
  const version = await milvusClient.getVersion();
  console.log('--- Show version ---', version);
  const showCollectionRes = await collectionManager.showCollections();
  console.log('--- Show collections ---', showCollectionRes);
  // need load collection before search
  //   const loadCollectionRes = await collectionManager.loadCollectionSync({
  //   collection_name: collectionName,
  //   });
  //   console.log(
  //   '--- Load collection (' + collectionName + ') ---',
  //   loadCollectionRes
  // );
  //   const collection_data = milvusClient.dataManager.search({
  //     collection_name: collectionName})
  //   console.log('--- Show collections entities ---', collection_data);
}

dataBaseOperate();
