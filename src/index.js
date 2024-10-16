import axios from 'axios';
import dotenv from "dotenv";

dotenv.config();

const userName = process.env.userName
const rapidApiKeys = [
  process.env.RAPID_API_KEY_1,

]
let oldDescription = ""

const rapidapiHost = process.env.RAPID_API_HOST_1;

const options = {
  method: 'GET',
  url: 'https://twitter283.p.rapidapi.com/UserResultByScreenName',
  params: {'username': "zm190937"},
  headers: {
    'x-rapidapi-key': rapidApiKeys[0],
    'x-rapidapi-host': "twitter283.p.rapidapi.com"
  }
};

export async function Post(message) {
  try {
      const response = await axios.post('https://open.feishu.cn/open-apis/bot/v2/hook/04e8b919-61fd-4325-b99e-ccaea694f590', {
          "msg_type": "text",
          "content": {
              "text": message
          }
      });
      console.log(response.data);
  } catch (error) {
      if (error.response) {
          // 服务器响应了状态码但状态码不在 2xx 范围内
          console.log("Error status:", error.response.status);
          console.log("Error data:", error.response.data);
      } else if (error.request) {
          // 请求发出去了但没有收到响应
          console.log("No response received:", error.request);
      } else {
          // 其他错误（例如设置请求时发生的错误）
          console.log("Error message:", error.message);
      }
  }
}

export async function fetchTwitterChange() {
  try {
    
    const response = await axios.request(options);
    let description;
    if(response){  description = response.data.data.user_results.result.profile_bio.description;}
 
    // console.log(response.data);
    
    if( description != oldDescription){
      
      oldDescription = description;
      let message = `马斯克换新简介了🥂⬇⬇⬇⬇ \n${description}`
      //console.log(message);
      // Post(message);
      try{
        await Post(message);
    } catch (error) {
      throw error;
    }
  }
}catch (error) {
    console.error(error);
  }

  return 0;

}

setInterval(fetchTwitterChange, 1000);