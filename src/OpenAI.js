const {Configuration,OpenAIApi} = require('openai');
const configuration = new Configuration({apiKey:"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"});
const openai = new OpenAIApi(configuration);

export async function  sendMsgToOpenAI(message){
    const response = await openai.createCompletion({
        model : 'text-davinci-003',
        prompt : message,
        temperature :0.7,
        max_tokens : 256,
        top_p : 1,
        frequency_penalty:0,
        presense_penalty : 0,
    })
    return response.data.choices[0].text;
    
}