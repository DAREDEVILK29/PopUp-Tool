
# POPUP TOOL

PopUp Tool is an extension that allows users to select text and summarize, explain, or translate it.

## Installation Guide

1. Extract the zip folder.
2. Open Chrome Dev Tools / Chromium.
3. Install Prompt API: `await ai.languageModel.capabilities();` if not already installed.
4. Enable necessary Flags in Chrome Dev Tools.

### Installing the Extension
1. Open Chrome Dev Tools, click on "Manage Extensions," and turn on "Developer Mode."
2. Click on "Load unpacked," locate the extracted `PopUp-Tool` folder.
3. Select the `PopUp-Tool` folder and check if the extension has been installed in "Manage Extensions."

### Read the instructions below before using or testing the extension!

---

## API Used
- Prompt API

---

## Features

The tool provides four options:
1. Summarize
2. Define
3. Explain
4. Translate

---

## Functionality and How to Use the Extension

1. Select the text or paragraph you want to summarize, explain, etc.
2. Right-click -> PopUp-Tool -> Choose one of the four options.
3. Each option sends the selected text to the Prompt API, which returns a response displayed in a modal popup on the webpage after a few seconds.

---

## PopUp-Tool Options and Instructions

### 1. Summarize / Summarize this text
- Sends the selected text to the Prompt API and returns an easy-to-understand summary of the selected text.
- Takes up to 10 seconds for the Prompt API to generate the response.

**Best sites to try:** News articles, blog posts, Wikipedia.

---

### 2. Define / Define this word
- Lets the user select a word or two and provides a definition for the selected words.
- The maximum selection is two words. Selecting more than two words will return an error, prompting you to select a single word.

**Important Notes:**
- It can only provide definitions for English words. Non-English words will return an error.

**Best sites to try:** News articles, blog posts, Wikipedia.

---

### 3. Explain / Explain and Breakdown
- Lets users select a paragraph or more and provides an explanation and breakdown of the selected text, including key points and subpoints.
- Can also be used on code snippets to provide explanations and breakdowns.


**Best sites to try:** News articles, blog posts, Wikipedia, and LeetCode, etc.

---

### 4. Translate / Translate this text
- Lets users translate selected texts and provides a simple summarized translation.
- Currently supports translations for "Japanese" and "Spanish."
- Some texts may not be translated if they are too complex for the Prompt API to handle.

**Best sites to try:**
- For Japanese: [NHK News Easy](https://www3.nhk.or.jp/news/easy/) or any Japanese website.
- For Spanish: [FluentU Blog](https://www.fluentu.com/blog/spanish/spanish-poems/) or any Spanish website.

---

## Problems This Extension Solves

1. It has always been a hassle to get definitions, summaries, and explanations. For instance:
   - To get a definition, you often have to open a new tab, type or paste the word, and search for it.
   - Summarizing or explaining a text or code can be time-consuming and repetitive.
   - users dont have to be overwhelmed by Multiple Features and have to find their way around on performing simple tasks

2. With PopUp-Tool, browsing becomes easier and less tiring:
   - its a straightforward tool that gives you what you want with no extra steps
   - You don't have to open a new tab or paste your content into a chatbot or application.
   - PopUp-Tool allows summarizing, defining, explaining, and translating with just a right-click, saving time and effort.

4. Many summarizing extensions rely on AI but:
   - They force you to open a new tab and create an account to use them.
   - It can take 2-5 minutes to get a summary or explanation.

5. Using Google's built-in AI (Prompt API) in PopUp-Tool:
   - You can summarize and more with Prompt API's content generator

6. PopUp-Tool helps non-native speakers learn languages or understand articles/blog posts easily, with no extra steps—just a RIGHT CLICK!

---

### Notes:
- Initial Attempt Might be Slow in Response

