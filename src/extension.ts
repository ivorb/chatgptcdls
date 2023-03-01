// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const fetch = require('node-fetch');

let jsonContent = {
	"prompt": "",
	"temperature": 1,
	"top_p": 0.95,
	"frequency_penalty": 0,
	"presence_penalty": 0,
	"best_of": 1,
	"max_tokens": 2048,
	"stop": [
	  "<|im_end|>"
	]
  }

let kcPrompt = "<|im_start|>system\nAct like a content developer. You're writing technical content for people wanting to learn more about Microsoft technologies. You need to create a multiple choice question with four potential answers. Only one answer is correct. Provide the question, possible answers, and the correct answer. The question should test someone's knowledge after reading the following paragraph:\n<|im_end|>\n";
let summaryPrompt = "<|im_start|>system\nAct like a content developer. You're writing technical content for people wanting to learn more about Microsoft technologies. Write a summary with a maximum of two sentences for the following paragraph:\n<|im_end|>\n";
let introPrompt = "<|im_start|>system\nAct like a content developer. You're writing technical content for people wanting to learn more about Microsoft technologies. Write an introduction with a maximum of two sentences for the following paragraph:\n<|im_end|>\n";

let startTag = "<|im_start|>user\n";
let endTag = "\n<|im_end|>\n<|im_start|>assistant\n";

export function activate(context: vscode.ExtensionContext) {

	console.log('ChatGPT for CDLs is now active!');
	const extensionConfig = vscode.workspace.getConfiguration('chatgptCDL')
	const chatGPTUrl = extensionConfig.get('chatgptURL')
	const apiKey = extensionConfig.get('apiKey')

	// Generate KC questions command
	let kcDisposable = vscode.commands.registerCommand('chatgptCDL.generateQuestions', async () => {
		
		// Get current selection
		console.log("Getting current selection");
		let currentSelection = vscode.window.activeTextEditor?.document.getText(
			vscode.window.activeTextEditor?.selection);

		let jsonResponse = await postChatGPT(String(chatGPTUrl), String(apiKey), currentSelection, kcPrompt);
		let answer = jsonResponse.choices[0].text;
		console.log("Text KC ANSWER:" + answer);

		vscode.workspace.openTextDocument({ content: String(answer), language: 'markdown' })
		vscode.window.showInformationMessage('Generated questions in new file!')
	});

	// Generate intro questions command
	let introDisposable = vscode.commands.registerCommand('chatgptCDL.introText', async () => {
		
		// Get current selection
		console.log("Getting current selection");
		let currentSelection = vscode.window.activeTextEditor?.document.getText(
			vscode.window.activeTextEditor?.selection);

		let jsonResponse = await postChatGPT(String(chatGPTUrl), String(apiKey), currentSelection, introPrompt);
		let answer = jsonResponse.choices[0].text;
		console.log("Text INTRO ANSWER:" + answer);

		vscode.workspace.openTextDocument({ content: String(answer), language: 'markdown' })
		vscode.window.showInformationMessage('Generated intro in new file!')
	});

	// Generate summary questions command
	let summaryDisposable = vscode.commands.registerCommand('chatgptCDL.summaryText', async () => {
		
		// Get current selection
		console.log("Getting current selection");
		let currentSelection = vscode.window.activeTextEditor?.document.getText(
			vscode.window.activeTextEditor?.selection);

		let jsonResponse = await postChatGPT(String(chatGPTUrl), String(apiKey), currentSelection, summaryPrompt);
		let answer = jsonResponse.choices[0].text;
		console.log("Text SUMMARY ANSWER:" + answer);

		vscode.workspace.openTextDocument({ content: String(answer), language: 'markdown' })
		vscode.window.showInformationMessage('Generated summary in new file!')
	});

	context.subscriptions.push(kcDisposable, introDisposable, summaryDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log('ChatGPT for CDLs is now inactive!');
}

async function postChatGPT(url = '', apiKey = '', data = {}, prompt = '') {
	
	jsonContent.prompt += prompt + startTag + data + endTag;
	console.log(jsonContent.prompt);
	
	const response = await fetch(url, {
	  method: 'post', 
	  body: JSON.stringify(jsonContent), 
	  headers: {
		'Content-Type': 'application/json',
		'api-key': apiKey
	  },
	});

	return await response.json(); // parses JSON response into native JavaScript objects
  }
