# ChatGPT for CDLs

This extension enables creation of content for various functions of a content developer, powered by Azure OpenAI ChatGPT model.

## Features

All options are available within the context menu when text is selected. ChatGPT is asked to think like a content developer, and create the following for you:

### Generate intro text

Given the selected text, ask ChatGPT to create a intro of up to 2 sentences.

### Generate knowledge check question

Given the selected text, ask ChatGPT to create a knowledge check question with 4 possible answers.

### Generate summary text

Given the selected text, ask ChatGPT to create a summary of up to 2 sentences.

## Requirements

You will need to provide your own Azure OpenAI endpoint and key. The endpoint needs to be a deployment of the ChatGPT model.

## Extension Settings

This extension contributes the following settings:

* `chatgptCDL.chatgptURL`: Set to the URL of your resource
* `chatgptCDL.apiKey`: Set to the API key of your resource

## Known Issues

There is a limit of 2048 tokens for the entire request, so keep the text you include limited. There are additional system prompts sent with the selected text, so aim to keep under about 1800 tokens (roughly 1200 words).

## Release Notes

Release notes for available versions.

### 0.1.0

Beta release of initial features.
