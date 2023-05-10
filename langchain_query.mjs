import { Milvus } from 'langchain/vectorstores/milvus';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
// import { HttpsProxyAgent } from 'https-proxy-agent';
// import HttpProxyAgent from "http-proxy-agent";
// const httpAgent = HttpProxyAgent('http://127.0.0.1:7890');
// const httpsAgent =  new HttpsProxyAgent('http://127.0.0.1:7890');
import dotenv from 'dotenv';
dotenv.config();

export const run = async () => {
  console.log('--- run start ---', new Date());
  const vectorStore = await Milvus.fromExistingCollection(
    new OpenAIEmbeddings(
      {
        openAIApiKey: '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',
        // timeout: 10000,
        maxRetries: 0,
      },
      {
        // basePath: 'http://localhost:3001/v1',
        baseOptions: {
          // adapter: null,
          // httpAgent: httpsAgent,
          // httpsAgent: httpsAgent,
        },
      }
    ),
    {
      collectionName: 'server_test_collection_1',
    }
  );
  const resultOne = await vectorStore.similaritySearch('旅行达人', 3);
  console.log(resultOne);
  console.log('--- run end ---', new Date());
};

run();
