export function toggleFileName(fileName: string): string {
  if (fileName.endsWith('Test.java')) {
    return fileName.replace(/Test\.java$/, '.java');
  }
  return fileName.replace(/\.java$/, 'Test.java');
}

export function extractPackage(source: string): string {
  const match = source.match(/package\s+([a-z.]+)\s*;/);
  return match ? match[1] : '';
}
