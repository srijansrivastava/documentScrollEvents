var scrollEvents = (function(document, $){
    
    var d = {
        scrolling: false,
        scrollDirection : 'none',
        scrollTop: 0,
        eventRegister: {
            scroll: [],
            scrollToTop: [],
            scrollToBottom: [],
            scrollStarted: [],
            scrollStopped: [],
            scrollToTopStarted: [],
            scrollToBottomStarted: []
        },
        getScrollTop: function(){ 
            return d.scrollTop;
        },
        setScrollTop: function(y){
            d.scrollTop = y;
        },
        isScrolling: function(){
            return d.scrolling;
        },
        setScrolling: function(bool){
            var oldVal = d.isScrolling();
            d.scrolling = bool;
            if(bool){
                d.executeCallbacks('scroll');
                if(oldVal !== bool){
                    d.executeCallbacks('scrollStarted');
                }
            }else{
                d.executeCallbacks('scrollStopped');
            }
        },
        getScrollDirection : function(){
            return d.scrollDirection;
        },
        setScrollDirection : function(direction){
            var oldDirection = d.getScrollDirection();
            d.scrollDirection = direction;
            if(direction === 'UP'){
                d.executeCallbacks('scrollToTop');
                if(direction !== oldDirection){
                    d.executeCallbacks('scrollToTopStarted');
                }
            }else if(direction === 'DOWN'){
                d.executeCallbacks('scrollToBottom');
                if(direction !== oldDirection){
                    d.executeCallbacks('scrollToBottomStarted');
                }
            }
        },
        init : function(){
            d.setScrollTop($(document).scrollTop());
            var timer = null;
            $(window).scroll(function(){
                d.setScrolling(true);
                var x = d.getScrollTop();
                setTimeout(function(){
                    var y = $(document).scrollTop();
                    d.setScrollTop(y);
                    if(x > y){
                        d.setScrollDirection('UP');
                    }else{
                        d.setScrollDirection('DOWN');
                    }
                }, 100);
                if(timer !== 'undefined' && timer !== null){
                    clearTimeout(timer);
                }
                timer = setTimeout(function(){
                    d.setScrolling(false);
                    d.setScrollDirection('NONE');
                }, 200);
            });
        },
        registerEvents : function(eventName, callback){
            if(typeof eventName !== 'undefined' && typeof callback === 'function' && typeof d.eventRegister[eventName] !== 'undefined'){
                d.eventRegister[eventName].push(callback);
            }
        },
        executeCallbacks: function(eventName){
            var callabacks = d.eventRegister[eventName];
            for(var k in callabacks){
                if(callabacks.hasOwnProperty(k)){
                    callabacks[k](d.getScrollTop());
                }
            }
        }
    };
    return d;
})(document, $);