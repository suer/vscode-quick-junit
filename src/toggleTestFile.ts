import * as vscode from 'vscode';
import { basename } from 'path';
import { toggleFileName, extractPackage } from './logic';

export async function toggleTestFile(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage('No file is currently open.');
    return;
  }

  const currentFileName = basename(editor.document.uri.fsPath);
  const targetFileName = toggleFileName(currentFileName);

  const files = await vscode.workspace.findFiles(`**/${targetFileName}`);
  if (files.length === 0) {
    return;
  }

  if (files.length === 1) {
    const document = await vscode.workspace.openTextDocument(files[0]);
    await vscode.window.showTextDocument(document);
    return;
  }

  const currentPackage = extractPackage(editor.document.getText());
  for (const file of files) {
    const document = await vscode.workspace.openTextDocument(file);
    const candidatePackage = extractPackage(document.getText());
    if (currentPackage === candidatePackage) {
      await vscode.window.showTextDocument(document);
      return;
    }
  }
}
