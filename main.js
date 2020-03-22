(function() {
    let startBtn = $('.startBtn');
    let mainInput = $('.main-input');
    let allLines = $('.line');
    let allText = [];
    let score = 0;
    let displayResult = $('.display-result');
    
    startBtn.on('click', startGame);
    
    function startGame() {
        $(this).hide();
        mainInput.focus();
    
    //setup
    let speed = 1;
    let textLength = 3;
    let typingWords = words.filter(word => word.length == textLength);
    let level = 6; //ne idemo od prvog levela jer bi bilo presporo kretanje spanova(reci) 
    
    let speedUp = setInterval(function(){
        textLength++;
        typingWords = words.filter(word => word.length == textLength);
    },20000)    
        
    mainInput.on('keyup', checkInputTyping);
    function checkInputTyping() {
        let inputVal = $(this).val();
        let self = $(this);
        
        //testiranje
        if(allText.includes(inputVal)) {
            let index = allText.indexOf(inputVal);
            allText.splice(index,1);
            $('span').filter(function() {
                return $(this).text() == inputVal;
            }).css('background', 'aqua').fadeOut(100, function(){
                $(this).remove;
            })
            self.val("");
            score++;
            displayResult.html(score);
        }
    }
        
    //insert spans (reci)
    function insertSpans() {
        for(var i = 0; i < allLines.length; i++) {
            let rand = Math.floor(Math.random() * 20);
            
            if(rand <= level) {
                let text = chooseText();
                allText.push(text);
                $(allLines[i]).append(`<span>${text}</span>`)
            }
         }
        setTimeout(insertSpans, 7000);
      }
        insertSpans();
        
        function chooseText() {
            let rand = Math.floor(Math.random() * typingWords.length);
            let savedText = typingWords[rand];
            typingWords.splice(rand, 1);
            
            return savedText;
        }
        
        // span animations
        let moveAll = setInterval(function(){
            let allSpans = $('span');
            allSpans.css({
                left: '+='+speed
            })
            //testiranje
            $.each(allSpans,(index, element)=>{
                let position = $(element).position().left;
                if(position > 850){
                    clearAllIntervals()
                }else if(position > 700 && position < 710) {
                    $(element).addClass('danger');
                }
            })
        },100)
        
        function clearAllIntervals() {
            clearInterval(moveAll);
        }
    }
})()