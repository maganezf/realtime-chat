export const encrypt = (message: string) => {
  let messageValues = message.split('');
  messageValues = messageValues.map(letter => letter.charCodeAt(0).toString());
  return messageValues;
};

export const decrypt = (messageValues: string[]) => {
  messageValues = messageValues.map(letter =>
    String.fromCharCode(Number(letter))
  );
  return messageValues.join('');
};
