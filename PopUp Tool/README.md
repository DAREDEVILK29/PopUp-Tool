
# PopUp Tool

**PopUp Tool** is a Chrome extension that allows users to select text and quickly get a summary, definition, explanation, or translation.

---

## Installation Guide

### Prerequisites
1. Ensure **Prompt API** is installed: `await ai.languageModel.capabilities();`
2. Enable necessary flags in Chrome DevTools.

### Installing the Extension
1. Extract the zip folder containing the extension.
2. Open Chrome and navigate to **Manage Extensions**.
3. Enable **Developer Mode** (toggle it on in the top right corner).
4. Click **Load unpacked** and locate the extracted "PopUp-Tool" folder.
5. Verify that the extension appears under **Manage Extensions**.

---

## APIs Used
- **Prompt API**: Used for summarization, explanation, definition, and translation functionality.

---

## Features

The tool provides four main options:  
1. **Summarize**  
2. **Define**  
3. **Explain**  
4. **Translate**

---

## How to Use

1. Select the desired text or paragraph.
2. Right-click and choose **PopUp Tool** > Select an option (Summarize, Define, Explain, Translate).
3. A modal popup will appear on the webpage with the result from the Prompt API.

---

## Options and Instructions

### 1. Summarize  
- Generates a concise, easy-to-understand summary of the selected text.  
- **Response Time**: Up to 10 seconds.  
- **Best Sites to Try**: News articles, blog posts, Wikipedia.

---

### 2. Define  
- Provides definitions for English words (maximum selection: 2 words).  
- **Response Time**: Quick.  
- **Note**: Non-English words will return an error.  
- **Best Sites to Try**: News articles, blog posts, Wikipedia.

---

### 3. Explain  
- Breaks down paragraphs or code snippets into key points and subpoints with explanations.  
- **Response Time**: Up to 20 seconds (may require multiple attempts).  
- **Note**: Works only with English text; non-English selections will return an error.  
- **Best Sites to Try**: News articles, blog posts, Wikipedia, LeetCode.

---

### 4. Translate  
- Translates text to **Japanese** or **Spanish**.  
- **Response Time**: Up to 15–20 seconds.  
- **Notes**:  
  - Works best with a single paragraph.  
  - Non-English selections with multiple paragraphs will return an error.  
  - Complex sentences may not always translate accurately.  
- **Best Sites to Try**:  
  - Japanese: [NHK Easy News](https://www3.nhk.or.jp/news/easy/)  
  - Spanish: [FluentU Spanish Poems](https://www.fluentu.com/blog/spanish/spanish-poems/)

---

## Problem This Extension Solves

PopUp Tool simplifies tasks like summarizing, defining, explaining, and translating text directly within your browser.  
- No need to open a new tab or copy-paste text into another application.  
- Unlike many other AI-powered extensions, PopUp Tool does not require account creation or additional setup.  
- Uses Chrome's built-in AI (Prompt API) to deliver results efficiently.  

This tool is especially useful for:  
- Quickly understanding articles, blog posts, or code snippets.  
- Learning new languages or clarifying content for non-native speakers.  

---

## Notes and Limitations

- **Complex Selections**: Some selections may fail due to Prompt API's current limitations. Proper error handling is implemented to manage such scenarios.  
- **Response Accuracy**: Generated responses may not always be accurate, as Prompt API is still in its early stages.  

---

Your project showcases how "built-in AIs" like Prompt API can make browsing more intuitive and efficient.  
