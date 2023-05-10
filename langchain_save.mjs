import { Milvus } from 'langchain/vectorstores/milvus';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { HttpsProxyAgent } from 'https-proxy-agent';
// import HttpProxyAgent from "http-proxy-agent";
// const httpAgent = HttpProxyAgent('http://127.0.0.1:7890');
const httpsAgent = new HttpsProxyAgent('http://127.0.0.1:7890');
import dotenv from 'dotenv';
dotenv.config();

export const run = async () => {
  console.log('--- run start ---', new Date());
  const texts = [
    '一直是我问你问题，你问我个问题吧。随便什么都行',
    '好的，你喜欢旅行吗？',
    '喜欢',
    '那你最喜欢去哪里旅行',
    '西藏是一个美丽而神秘的地方。你去过那里吗？如果有机会，你想去西藏的哪个地方呢？',
    '西藏很多地方我都去过，除了阿里地区，其他我基本都去过，我还去过其他省份的藏区',
    '哇，那你真的是个旅行达人啊！西藏地区有很多值得探索的地方，每个地方都有其独特的魅力和文化。有没有特别深刻的经历或者感受，可以和我分享一下吗？',
    '那相当多了，我举个偏门的例子，我特别喜欢那些三岔路口。两条不同的路，完全通向不同的地方，一条指向青海，一条指向四川',
    '听起来很有意思！那你最后选择了那一条路呢？是去了青海还是四川呢？还是你选择了一条自己的路',
    '哈哈，选择了四川，因为想去川北地区',
  ];
  const textIds = texts.map((item, index) => ({ id: index + 1 }));
  const vectorStore = await Milvus.fromTexts(
    texts,
    textIds,
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
          httpAgent: httpsAgent,
          httpsAgent: httpsAgent,
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
