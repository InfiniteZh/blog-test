// ai.js
const fetch = require('node-fetch'); // 引入node-fetch库

module.exports = async function ai(custom, token, api, model, content, prompt, max_token) {
  const apiUrl = api || 'http://47.99.99.38:8000/v1/chat/completions'; // 设置API地址
  const auth_token = token || 'uVDIFaKG3FlLjvufSdeIpczLsb1cgwkJkof_BNpwU_TOTNChZBoeM1KJexdfb9zhYnsN5Zos6qISCrRt7mGxbigG2Cd4fWaCmBZHIzsgdZq64XXWQgyKFeuf0vpmV*s*CT58JlM_1t$w37U$bx8LPiGZ0'; // 设置身份验证token

  const headers = {
    'Authorization': `Bearer ${auth_token}`,
    'Content-Type': 'application/json',
  };

  const data = {
    "model": model || 'qwen',
    "messages": [
      {
        "role": "user",
        "content": content
      }
    ],
    "stream": false
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data), // 发送JSON格式的数据
  });

  if (!response.ok) {
    throw new Error(`请求失败: ${response.statusText}`);
  }

  const response_data = await response.json();
  return response_data.choices[0].message.content; // 返回GPT完成的对话内容
};