export const trimFileName = (fileName, maxLength = 50) => {
  if (fileName.length <= maxLength) {
    return fileName;
  }

  const parts = fileName.split(".");
  const extension = parts.pop();
  const baseName = parts.join(".");

  const keepLength = maxLength - extension.length - 1;

  const trimmedName = baseName.substring(0, keepLength) + "..." + extension;

  return trimmedName;
};
