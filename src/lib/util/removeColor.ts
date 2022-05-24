// Stolen from Stackoverflow... I have not gone through the regex to verify it, but it seems to be working.
export const removeColors = (msg: string) =>
  msg.replace(
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
