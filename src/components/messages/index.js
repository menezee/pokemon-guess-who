import messages from './messages.json';

function getMessage(key, variables = {}) {
  const messagesContainKey = key in messages;
  if (!messagesContainKey) throw new Error(`no message found for key: ${key}`);
  
  let result = messages[key];
  for (const [key, value] of Object.entries(variables)) {
    result = result.replace(`{{ ${key} }}`, value);
  }
  
  return result;
}

export default getMessage;
