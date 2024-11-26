
# PopUp-Tool

PopUp Tool is an extension that allows users to select texts and summarize, explain and translate

## Installation Guide
-> extracts the zip folder
-> open chrome dev tools/ chromium
-> install Prompt API > await ai.languageModel.capabilities(); if not installed
-> enable necessary Flags in chrome dev tools
>Installing the extension
->Open Chrome Dev tools, click on "Manage Extensions" and turn on "Developer Mode"
-> click on "Load unpacked" locate the PopUp-Tool Folder that was Extracted
-> Select the "PopUp-Tool" Folder and Check if the Extension has been installed in "Manage Extensions"

### Read Instructions Below Before using or testing the extension !!


## Api used
->Prompt API

## Features
The Tool Provides with 4 options
1.Summarize
2.Define
3.Explain
4.Translate

## Functionality and How to Use the Extension

->Users need to select a text or a paragraph they want to summarize,explain etc 
and Right-Click->PopUp-Tool->Choose one of the 4 Options

->Each option selects the text and pass it to Prompt API which then after Few Seconds
sends a response back to a Modal Popup in the webpage.

## PopUp-Tool Options and Instructions!

1. Summarize/Summarize this text
-> sends the selected text to Prompt Api and returns an easy to understand summary of the selected text
-> takes upto 10 seconds for Prompt API to generate the response and return it.

   ^Best sites to try on are News Articles,Blog Posts,WikiPedia

2.Define/Define this word
-> lets the user select a word or two and provides a definition for the selected words.
-> max selection is 2 words. any more than 2 words will return an error and asks you to select a word!
>IMPORTANT NOTEs TO REMEMBER WHEN USING Define Option
->it can ONLY provide definition to English words, non-english words will return an error!

 ^Best sites to try on are News Articles,Blog Posts,WikiPedia

3.Explain/Explain and Breakdown
-> lets users select a paragraph or more and provide an explanation and breakdown of the selected text.
   with Key points and subpoints
-> this option can also be used on Code snippets to provide an explanation and breakdown.
>IMPORTANT NOTEs TO REMEMBER WHEN USING Explain Option
-> cant be used to summarize, translate! Only works on English Texts. non-english selections return an error
-> can take longer than 10 seconds, max is 20 seconds
-> First attempt may not work, just close modal and try again to get it to work

  ^Best sites to try on are News Articles,Blog Posts,WikiPedia and LeetCode etc!
 
4.Translate/ Translate this word
-> lets users translate Selected Texts and provides a simple summarized Translation of the text
-> Currently working Languages "JAPANESE" AND "SPANISH".
-> some texts might not be translated if they are too complex for Prompt Api to translate.
>IMPORTANT NOTEs TO REMEMBER WHEN USING Translate Option
-> can take upto 15 to 20 seconds for Prompt Api to send a response
-> if first attempt fails just try again!
-> Selecting More than one Non English Paragraph returns an error,
   Please select One paragraph to make translating easy for PromptAPI

  ^Best sites to try on: for japanese https://www3.nhk.or.jp/news/easy/ or any japanese website
   for spanish : https://www.fluentu.com/blog/spanish/spanish-poems/ or any spanish websites



## Problem this Extension trying solve
> its always been an hassle to get Definition, Summary and Explanations.
  if someone needs a Definition you need to open a new tab type in or paste a word you want a definition for,
  or trying to get an explanation or summary for a text or code which can be time consuming and exhaustingly 
  repetitive.
> with PopUp-Tool, Browsing makes it more easier and less tiring. you dont have to open a new tab or
  type in or paste your code or texts in a chatbot or applications. Popup-tools makes summarizing, defining
  and explaining and even translating easier with just a right click and in few seconds you get what you want.
> lots of summarizing extentions which rely on ai force you to a new tab and Create an account in order to Use
  the extension. and it takes atleast 2 to 5 mins to get a summary or explanation for your text
> but by using Google's built in ai like PromptAPI in PopUp-Tool you can summarize and more with just a right click!
  you can get your summary, definition, explanation while sitting in the worst humanly impossible posture!
> PopUp-Tool helps in learning languages or undestanding Articles/Blogposts more easier to non-native speakers
  with no extra work or steps! again just with a RIGHT CLICK!



NOTE: SOME TEXT OR SELECTION MAY NOT WORK AS IT CAN BE TOO MUCH OR COMPLEX FOR PROMPT API TO HANDLE
      AND MIGHT RETURN AN ERROR, ENSURED PROPER ERROR HANDLING TO HANDLE SUCH SCENARIOS.
	    AS PROMPT API AND OTHERS ARE STILL IN EARLY-STAGE ALL GENERATED RESPONSE MIGHT NOT BE ACCURATE AT ALL TIMES.
	    THIS PROJECT/EXTENSION IS A DEMONSTRATION ON HOW "BUILT IN AIs" LIKE PromptAPI CAN BE UTILIZED TO 
	    MAKE BROWSING MORE EASIER.
