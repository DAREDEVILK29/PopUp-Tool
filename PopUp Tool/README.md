
# POPUP TOOL

**PopUp Tool** is an extension that allows users to select texts and summarize, explain and translate.

---

## Installation Guide

- Extract the zip/rar folder.
- Open Chrome Dev Tools / Chromium.
- Install Prompt API: `await ai.languageModel.capabilities();` if not installed.
- Enable necessary flags in Chrome Dev Tools.

### Installing the Extension

1. Open Chrome Dev Tools, click on **"Manage Extensions"**, and turn on **"Developer Mode"**.
2. Click on **"Load unpacked"**, locate the **PopUp-Tool Folder** that was extracted.
3. Select the **"PopUp-Tool" Folder** and check if the extension has been installed in **"Manage Extensions"**.

### Read Instructions Below Before Using or Testing the Extension!!

---

## API Used

- **Prompt API**

---

## Features

The tool provides four options:  
1. **Summarize**  
2. **Define**  
3. **Explain**  
4. **Translate**

---

## Functionality and How to Use the Extension

- Users need to select a text or a paragraph they want to summarize, explain, etc., then:  
  **Right-Click** → **PopUp-Tool** → Choose one of the four options.

- Each option selects the text and passes it to **Prompt API**, which then, after a few seconds, sends a response back to a **Modal Popup** on the webpage.

---

## PopUp-Tool Options and Instructions!

### 1. Summarize / Summarize this text  
- Sends the selected text to **Prompt API** and returns an easy-to-understand summary of the selected text.  
- **Takes up to 10 seconds** for Prompt API to generate the response and return it.

    **^Best sites to try on**: News Articles, Blog Posts, Wikipedia.

---

### 2. Define / Define this word  
- Lets the user select a word or two and provides a definition for the selected words.  
- **Max selection**: 2 words. Any more than 2 words will return an error and ask you to select a word!  

**IMPORTANT NOTES TO REMEMBER WHEN USING DEFINE OPTION**  
- It can **ONLY provide definitions for English words**; non-English words will return an error!  

    **^Best sites to try on**: News Articles, Blog Posts, Wikipedia.

---

### 3. Explain / Explain and Breakdown  
- Lets users select a paragraph or more and provides an explanation and breakdown of the selected text, with key points and subpoints.  
- This option can also be used on **Code Snippets** to provide an explanation and breakdown.

**IMPORTANT NOTES TO REMEMBER WHEN USING EXPLAIN OPTION**  
- Cannot be used to summarize or translate! Works **only on English texts**; non-English selections return an error.  
- **Can take longer than 10 seconds**, max is 20 seconds.  
- First attempt **may not work**; just close the modal and try again.  

    **^Best sites to try on**: News Articles, Blog Posts, Wikipedia, LeetCode, etc.!

---

### 4. Translate / Translate this word  
- Lets users translate selected texts and provides a simple summarized translation of the text.  
- Currently working languages: **Japanese** and **Spanish**.  
- Some texts might not be translated if they are too complex for Prompt API to handle.

**IMPORTANT NOTES TO REMEMBER WHEN USING TRANSLATE OPTION**  
- Can take **up to 15–20 seconds** for Prompt API to send a response.  
- If the first attempt fails, just try again!  
- Selecting more than one non-English paragraph returns an error. Please select one paragraph to make translating easy for Prompt API.

    **^Best sites to try on**:  
    - For Japanese: [NHK Easy News](https://www3.nhk.or.jp/news/easy/) or any Japanese website.  
    - For Spanish: [FluentU Spanish Poems](https://www.fluentu.com/blog/spanish/spanish-poems/) or any Spanish websites.

---

## Problem This Extension Is Trying to Solve  

It's always been a hassle to get definitions, summaries, and explanations.  
- If someone needs a definition, they need to open a new tab, type in or paste the word they want a definition for.  
- Trying to get an explanation or summary for a text or code can be time-consuming and exhaustingly repetitive.  

With **PopUp Tool**, browsing becomes easier and less tiring. You don't have to open a new tab or type in/paste your code or texts in a chatbot or applications. PopUp Tool makes summarizing, defining, explaining, and even translating easier with just a **right-click**, and in a few seconds, you get what you need.  

Other summarizing extensions that rely on AI force you to a new tab and require creating an account to use the extension. It often takes 2–5 minutes to get a summary or explanation for your text.  

By using **Google's built-in AI** like **Prompt API**, PopUp Tool enables summarizing and more with just a right-click! You can get your summary, definition, explanation while sitting in the **worst humanly impossible posture!**  

**PopUp Tool** also helps in learning languages or understanding articles/blog posts more easily for non-native speakers, with no extra work or steps—again, just with a **RIGHT CLICK**!

---

## Notes  

- Some text or selections may not work as they can be too much or too complex for Prompt API to handle, and might return an error. Proper error handling has been implemented to manage such scenarios.  
- Prompt API and similar tools are still in their **early stages**, so all generated responses might not be accurate at all times.  

This project/extension is a demonstration of how **built-in AIs** like **Prompt API** can be utilized to make browsing easier.
