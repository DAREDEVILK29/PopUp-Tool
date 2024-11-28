chrome.runtime.onInstalled.addListener(() => {
  const menuOptions = [
      { id: "Summarize", title: "Summarize this text", contexts: ["selection"] },
      { id: "Define", title: "Define this word", contexts: ["selection"] },
      { id: "Explain", title: "Explain and breakdown", contexts: ["selection"] },
      { id: "Translate", title: "Translate this Text", contexts: ["selection"] },
  ];

  menuOptions.forEach(option => chrome.contextMenus.create(option));
});




// listens for context menu right clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const actions = {
      Summarize: { title: "Summary", loadingTag: "Summary",systemPrompt:"you are a summarizer" },
      Define: { title: "Definition", loadingTag: "Definition", wordLimit: 2, systemPrompt:"you are a dictionary that is an expert in all the languages and can give a definition to any word"},
      Explain: { title: "Explanation", loadingTag: "Explanation",systemPrompt:"you explain things and breakdown" },
      Translate: { title: "Translation", loadingTag: "Translation",systemPrompt:"you are a translator" },
  };

  const action = actions[info.menuItemId];
  if (action) {
      injectCSSAndExecute(tab.id, showModal, [info, action.title, action.loadingTag, action.wordLimit || null,action.systemPrompt]);
     
  }
});

// Function to inject CSS and execute a script
function injectCSSAndExecute(tabId, func, args) {
  chrome.scripting.insertCSS({ target: { tabId }, files: ['styles.css'] }, () => {
      chrome.scripting.executeScript({
          target: { tabId },
          func,
          args,
      });
  });
}

// function for showing the modal
async function showModal(info,title,loadingTag,systemPrompt) {
    
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

  ////////// fresh code/ refactor v2 --> moved prompt api code directly into showModal method
 
  
 




 const promptTag = info.menuItemId
 const selectedText = info.selectionText




  //Prompt api
  const canPrompt = await ai.languageModel.capabilities();

  if (!canPrompt || canPrompt.available === 'no') {
    return "Gemini Nano Prompt API not available on this device";
  }

  // Check for token limit
  const characterLimit = 6144 * 4;
  const totalCharacter = Math.ceil(selectedText.length);

  // Create a session of the prompt API
  const promptSession = await ai.languageModel.create({
    systemPrompt: systemPrompt,
    temperature: 0.3,
    topK: 3
  });

  // Initialize prompt result
      let result = '';
      let previousChunk = '';
      let stream=''

  try {
    // Handle different prompt actions
    switch (promptTag) {
      case 'Summarize':
        stream = await promptSession.promptStreaming(`${promptTag} ${selectedText} in an understandable sentences that covers the main point of the text in enough sentences but not too long. "Break down into smaller paragraphs for easier understanding"`);
        break;
      case 'Define':
        stream = await promptSession.promptStreaming(`${promptTag} ${selectedText} in one sentence and one example. well formatted and spaced. non-bolded, non-italic response.`);
       
        break;
      case 'Explain':
        stream = await promptSession.promptStreaming(`use a standard Explanation Format to explain and breakdown ${selectedTexts} that covers the main point of the text`);
        break;
      case 'Translate':
        stream = await promptSession.promptStreaming(`${promptTag} ${selectedText} in simple and understandable sentence in few lines. highlight necessary words.`);
        break;
      default:
        stream = "Invalid prompt action";
        break;
    }


    
    for await (const chunk of stream) {
      const newChunk = chunk.startsWith(previousChunk)
          ? chunk.slice(previousChunk.length) : chunk;
      result += newChunk;
      previousChunk = chunk;

      if (result) {
        modal.querySelector('.modal-text p').innerHTML = result
        .replace(/\*\*(.*?)\*\*/g, '$1') 
        .replace(/\*(.*?)\*/g, '$1') 
        .replace(/^\*\s+/gm, '') 
        .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>') 
        .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
        .replace(/##\s+/g, '') 
        .replace(/\n/g, '<br>');
    } else {
      modal.querySelector('.modal-text p').textContent = `Oops! Something went wrong. Try again.`;
    }
    }
      
    
  


  } catch (error) {
    // Handle error during prompt session
    if (error.name === 'InvalidStateError') {
      stream = "Session has expired. Close the modal and retry.";
    } else if (error.name === 'OperationError') {
      stream = "Error executing the prompt. Operation error.";
    }
  } finally {
    promptSession.destroy();
  }

  // Check if character limit is exceeded
  if (totalCharacter > characterLimit) {
    return "Character/token limit exceeded! Please select text within the range.";
  }

 
 
   



}







