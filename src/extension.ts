import * as vscode from 'vscode';
import { basename } from 'path';

export function activate(context: vscode.ExtensionContext) {

  console.log('Congratulations, your extension "vscode-quick-junit" is now active!');

  const disposable = vscode.commands.registerCommand('vscode-quick-junit.toggleTestFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage('No file is currently open.');
      return;
    }

    const currentFileName = basename(editor.document.uri.fsPath);
    let targetFileName = null;
    if (currentFileName.endsWith('Test.java')) {
      targetFileName = currentFileName.replace(/Test\.java$/, '.java');
    } else {
      targetFileName = currentFileName.replace(/\.java$/, 'Test.java');
    }

    const files = await vscode.workspace.findFiles(`**/${targetFileName}`);
    if (files.length === 0) {
      return;
    }

    if (files.length === 1) {
      const document = await vscode.workspace.openTextDocument(files[0]);
      await vscode.window.showTextDocument(document);
      return;
    }

    const currentPackage = getPackage(editor.document);
    for (const file of files) {
      const document = await vscode.workspace.openTextDocument(file);
      const candidateFilePackage = getPackage(document);
      if (currentPackage === candidateFilePackage) {
        await vscode.window.showTextDocument(document);
        return;
      }
    }
  });

  context.subscriptions.push(disposable);
}

function getPackage(document: vscode.TextDocument): string{
  const src = document.getText();
  const match = src.match(/package\s+([a-z.]+)\s*;/);
  return match ? match[1] : '';
}

export function deactivate() {}
