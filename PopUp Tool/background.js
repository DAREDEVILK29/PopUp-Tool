
// okay so adds context menus - check
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "Summarize",
        title: "Summarize this text",
        contexts: ["selection"], 
    });
    //Define
    chrome.contextMenus.create({
        id: "Define",
        title: "Define this word",
        contexts: ["selection"],
    });
    //explain and breakdown
    chrome.contextMenus.create({
      id:"Explain",
      title: "Explain and breakdown",
      contexts: ["selection"]
    });
    //translate
    chrome.contextMenus.create({
      id:"Translate",
      title: "Translate this Text",
      contexts: ["selection"]
    });
   
});





// listens for context menu right clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    // for summarize this text options
    if (info.menuItemId === "Summarize") {
      chrome.scripting.insertCSS({
        target: { tabId: tab.id },
        files: ['styles.css'] 
      }, () => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: showModal,
          args: [info,"Summary","Summary"],
        });
      });
    }
    
    // for define this word option
    if(info.menuItemId === "Define")
    {
        chrome.scripting.insertCSS({
            target: { tabId: tab.id },
            files: ['styles.css'] 
          }, () => {
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              func: showModal,
              args: [info,"Define","Definition"],
            });
          });
    }

    //for explain and breakdown
    if(info.menuItemId === 'Explain')
    {
        chrome.scripting.insertCSS({
          target: {tabId: tab.id},
          files: ['styles.css']
        },()=>{
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: showModal,
            args: [info,"Explain","Explanation"]
          })
        })
    }
    // for translating
    if(info.menuItemId === 'Translate')
      {
          chrome.scripting.insertCSS({
            target: {tabId: tab.id},
            files: ['styles.css']
          },()=>{
            chrome.scripting.executeScript({
              target: {tabId: tab.id},
              func: showModal,
              args: [info,"Translate","Translation"]
            })
          })
      }
    
    
  });

// function for showing the modal
function showModal(info,title,loadingTag) {
    
    const heading = `${title}.`
    const text = info.selectionText;
    const selectedTexts = text.trim();
    const words = selectedTexts.split(/\s+/);
    let checkWordCount = false
   
    // limiting Define options word selection to 2
    if(title === 'Define')
    {
      if(words.length > 2)
      {
        checkWordCount = true
      }
    }

   

    
    // remove any existing modal
    const existingModal = document.getElementById("Modal");
    if (existingModal) existingModal.remove();
    
    // create the modal element
    const modal = document.createElement("div");
    modal.id = "Modal";
    // modal.classList.add("vertical-scroll");
    
    // create the html/modal passing title and loadingTag
    modal.innerHTML = `
        <div class="modal-heading ">
         <h1 class="heading" style="margin: 0; color: black;">${heading}</h1>
           <button class="btn-shine" id="exit">
            <span class="icon">&times;</span>
            </button>
         
         </div>
        </div>
        <div class="modal-text" style="padding: 20px;">
            <p id="countdown">Loading ${loadingTag}...<span id="timer"></span></p>
            <button class="close-modal" id="close-modal">
            <span>Exit Modal</span>
            </button>
        </div>

    
      
    `;
    document.body.appendChild(modal);
    
    // remove modal when clicked on close btn
    document.getElementById("close-modal").addEventListener("click", () => {
        modal.remove();
    });
    // Remove modal on any click outside its content
    document.getElementById("exit").addEventListener("click", () => {
      modal.remove();
     });
   
    
    

  // no countdown if word limit crossed for define
   if(!checkWordCount)
   {  
    // countdown until the api returns the response
    let countdownTime = 5;
    countdownTime = info.menuItemId === 'Translate'|| info.menuItemId === 'Explain'? 20 : 5; 
    const timerElement = document.getElementById("timer");
    timerElement.textContent = `within ${countdownTime} seconds!`;

    // countdown function to update the timer every second
    const countdownInterval = setInterval(() => {
     
        countdownTime--;
        if (countdownTime > 0) {
            timerElement.textContent = `within ${countdownTime} seconds!`;
        } else {
            clearInterval(countdownInterval); // stop countdown when it reaches 0
            timerElement.textContent = `${countdownTime === 0?"almost there!" : "1"}`;  // show 0 if api didnt send response yet
        }
    }, 1000);
   }


    // position code
    setTimeout(() => {
      //calculating height after rendering the modal

      // const modalHeight = modal.offsetHeight; --> not needed anymore
      const modalWidth = modal.offsetWidth; 

        // position the modal relative to the selection and get selection coordinates
        const selection = window.getSelection();
        let rect = { top: 100, left: 100 }; // Default position
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            rect = range.getBoundingClientRect();
        }

        const margin = 10; // space between the selection and the modal
        
        //to position the modal to the right
        modal.style.top = `${rect.top + window.scrollY}px`;
        modal.style.left = `${rect.left + rect.width + margin + window.scrollX}px`;
        
        const modalRightEdge = parseFloat(modal.style.left) + modalWidth;
           
          // to position below
          if(modalRightEdge > window.innerWidth) 
          {
          modal.style.top = `${rect.top + rect.height + margin + window.scrollY}px`; // below the selection
          modal.style.left = `${rect.left + window.scrollX}px`; // left to the selection
          }
  
      // to avoid going off the window/viewport
           if (parseFloat(modal.style.top) < 0) {
                modal.style.top = `${margin + window.scrollY}px`;
              }

    }, 0); 

   //Summarizing --> gets the response from sendResponse and inserts into html modal
   if(info.menuItemId === "Summarize")
   { 
    // sending message and getting response
    chrome.runtime.sendMessage({ action: 'summarize', text: info.selectionText }, async (response) => {
      let summarizedText = await response.summary;
      
  
      
      summarizedText = await summarizedText
      .replace(/\*\*(.*?)\*\*/g, '$1') 
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/^\*\s+/gm, '') 
      .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>') 
      .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>') 
      .replace(/##\s+/g, '') 
      .replace(/\n/g, '<br>');

      // Update modal content with the cleaned summary
      if (summarizedText) {
          modal.querySelector('.modal-text p').innerHTML = await summarizedText;
      } else {
          modal.querySelector('.modal-text p').textContent = "Oops Couldnt Summarize! Try again.";
      }
    });
   }
  
   //Defining a Word --> gets the response from sendResponse and inserts into html modal
   if(info.menuItemId === "Define")
    {
     chrome.runtime.sendMessage({ action: 'define', text: text }, async (response) => {
       let promptResponse = await response.promptResult;
 
       // remove Markdown-style formatting (hate regex)
       promptResponse = await promptResponse
       .replace(/\*\*(.*?)\*\*/g, '$1') 
       .replace(/\*(.*?)\*/g, '$1') 
       .replace(/^\*\s+/gm, '') 
       .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>') 
       .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>') 
       .replace(/##\s+/g, '')
       .replace(/\n/g, '<br>');
       // update modal and check for word limit and send error
       if(checkWordCount)
       {
        modal.querySelector('.modal-text p').textContent ="Please Select a Word.";
       }
       else if (promptResponse) {
           modal.querySelector('.modal-text p').innerHTML =await promptResponse;
       } else {
           modal.querySelector('.modal-text p').textContent ="Oops Couldnt Define this word. Try again!";
          
       }
     });
    }

   // explain and breakdown
   if(info.menuItemId === 'Explain')
   {
     chrome.runtime.sendMessage({action:'explain', text:info.selectionText},async (response)=>{
       let explanation = await response.explanation;
      
         // Clean Markdown-style formatting
         explanation = await explanation
         .replace(/\*\*(.*?)\*\*/g, '$1') 
         .replace(/\*(.*?)\*/g, '$1') 
         .replace(/^\*\s+/gm, '') 
         .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>') 
         .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
         .replace(/##\s+/g, '') 
         .replace(/\n/g, '<br>');

       if (explanation) {
        modal.querySelector('.modal-text p').innerHTML = await explanation;
       } else {
        modal.querySelector('.modal-text p').textContent ="Oops couldnt Explain this! Try summarizing it instead!";
       
    }
     });
   }
   //Translate
   if(info.menuItemId === 'Translate')
    {
      chrome.runtime.sendMessage({action:'translate', text:info.selectionText},async (response)=>{
        let translation = await response.translation;
       
          // Clean Markdown-style formatting
          translation = await translation
          .replace(/\*\*(.*?)\*\*/g, '$1') 
          .replace(/\*(.*?)\*/g, '$1') 
          .replace(/^\*\s+/gm, '') 
          .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>') 
          .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
          .replace(/##\s+/g, '') 
          .replace(/\n/g, '<br>');
 
        if (translation) {
         modal.querySelector('.modal-text p').innerHTML = await translation;
        } else {
         modal.querySelector('.modal-text p').textContent ="Oops couldnt Translate this! Try again";
        
     }
      });
    }
   
}

// receiving message from runtime.sendmessage
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // summarize
  if (message.action === 'summarize')
  {   
      let messageText = message.text
      const systemPrompt = "you are a summarizer"
      PromptApi(messageText,systemPrompt,"summarize").then((summary) => {
          sendResponse({ summary: summary });
      }).catch((error) => {
          sendResponse({ summary: "Couldnt summarizing text. Please try again!" });
      });
      return true;
  }
  // define
  if(message.action === 'define')
  {  
    const systemPrompt = "you are a dictionary that is an expert in all the languages and can give a definition to any word"
     PromptApi(message.text,systemPrompt,'define').then((promptResult)=>{
      sendResponse({promptResult: promptResult});
     }).catch((error)=>{
      sendResponse({ promptResult: "Couldnt find definition of the word. Please try again!" });
  
     })

     return true;
  }
  // explain
  if(message.action === 'explain')
  {  
     const systemPrompt = 'you explain things and breakdown';
     PromptApi(message.text,systemPrompt,'explain and breakdown').then((explanation)=>{
      sendResponse({explanation:explanation})
     }).catch((error)=>{
      sendResponse({explanation:"Could not explain. try again!"})
     })
     return true
  }
  // translate
  if(message.action === 'translate')
    {  
       const systemPrompt = 'you are a translator';
      PromptApi(message.text,systemPrompt,'translate').then((translation)=>{
        sendResponse({translation:translation})
       }).catch((error)=>{
        sendResponse({translation:"Couldnt Translate. Try again!"})
       })
       return true
    }

});


// SUMMARIZER API --> not used.
async function summarizeText(selectedText) {
  // Check if the Summarization API is available
  const canSummarize = await ai.summarizer.capabilities();
  if (!canSummarize || canSummarize.available === 'no') {
      return "Summarization API not available on this device";
  }
  //Checking for token limit
  const characterLimit = 1024*4
  const totalCharacter = Math.ceil(selectedText.length)
  

  
  // Create a summarizer session
  const summarizer = await ai.summarizer.create();

  let summary = "";
  try {
      // Summarizing the selected text
      summary = await summarizer.summarize(selectedText);
  } catch (error) {
      console.error("Error summarizing text:", error);
      summary = "Error summarizing text. Please install the api or use chrome Dev tools";
  } finally {
      
      summarizer.destroy();
  }
  // checking if tokens or characters exceeded the limit and return error
  if(totalCharacter>characterLimit)
  {
        return "Character/token limit exceeded! please selected text within the range"
  }
 
  return summary;
}
//Prompt API--> used for define, summary, explanation
async function PromptApi(selectedText,systemPrompt,promptTag) {
  // checking if the api is installed
  const canPrompt = await ai.languageModel.capabilities()

  if(!canPrompt || canPrompt.available === 'no')
  {
    return "Gemini Nano Prompt API not available on this device";
  }

  //Checking for token limit
  const characterLimit = 6144*4
  const totalCharacter = Math.ceil(selectedText.length)

  //creating a session of prompt api
  const promptSession = await ai.languageModel.create({
    systemPrompt: systemPrompt,
    temperature: 0.7,
    topK: 50

  })
  
  // getting response and returning it
  let promptResult = ""
  try {
    if(promptTag === 'summarize')
    {
      promptResult = await promptSession.prompt(`${promptTag} ${selectedText} in simple and understandable sentence in few lines. highlight necessary words.`)
    }
    else if(promptTag === 'define')
    {
      promptResult = await promptSession.prompt(`${promptTag} ${selectedText} in one sentence and one example. well formated and spacing. non-bolded,non-italic response`)
    }
    else if(promptTag === 'explain and breakdown')
    {
      promptResult = await promptSession.prompt(`${promptTag} ${selectedText} in a simple way with points. if it has key points include number pointers`)
    }
    else if(promptTag === 'translate')
    {
        promptResult = await promptSession.prompt(`${promptTag} ${selectedText}in simple and understandable sentence in few lines. highlight necessary words.`)
    }
  } catch (error) {
    if(error.name === 'InvalidStateError')
    {
      promptResult = "session has expired. close the modal and retry"
    }
    else if(error.name === 'OperationError')
    {
      promptResult = "Error executing the prompt. operation error"
    }
    
  }
  finally
  {
     promptSession.destroy()
  }
  
  if(totalCharacter>characterLimit)
    {
      return "Character/token limit exceeded! please select text within the range"
    }
  
  return  promptResult
}


