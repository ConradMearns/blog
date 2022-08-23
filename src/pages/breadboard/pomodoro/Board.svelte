
<!-- 
the c variable should preform an update tick - no "time calc"
a struct mainatins the current state - including start time, end time, etc
the display always shows the current time - start time in appropriate way - this way, the timer can be saved when the application is left
this also means it's trivial to sync clock info to other devices (you know what i mean)
 -->


 <script>

    const states = {
        READY: 'ready',
        COUNTDOWN: 'countdown',
        COUNTDOWN_END: 'countdown_end',
    }
    
    let state = states.READY;
    
    let c = -1;
    
    let task = '';
    
    let timer_init = 20;
    
    setInterval(() => {
        if (state == states.COUNTDOWN) {
            if (c > 0) c--;
            if (c == 0) handleEnd();
        }
        if (state == states.COUNTDOWN_END) {
            c++;
        }
    }, 1000);
    
    $: minutes = Math.floor(c / 60);
    $: minname = minutes > 1 ? "mins" : "min";
    $: seconds = Math.floor(c - minutes * 60)
    
    function handleStart() {
        c = timer_init * 60;
        console.log("started at", new Date());
    }
    
    function handleEnd() {
        if (state == states.COUNTDOWN) {
            console.log('timer ended at', new Date());
            console.log('break started at', new Date());
            c = -1;
            state = states.COUNTDOWN_END;
            sendNotification();
        }
    }
    
    function handleOnReady() {
        if (state == states.READY) {
            state = states.COUNTDOWN;
            handleStart();
        }	
    }
    
    function handleCancel() {
        if (state == states.COUNTDOWN) {
            state = states.READY;
            console.log('canceled at', new Date());
        }	
    }
    
    function handleFinish() {
        if (state == states.COUNTDOWN_END) {
            state = states.READY;
            console.log('finished break at', new Date());
        }	
    }
    
    function handleNotificationAccess() {
        Notification.requestPermission().then(function(result) {
            if(result === 'granted') {
                randomNotification();
            }
        });
    }
    
    function randomNotification() {
        // var randomItem = Math.floor(Math.random()*games.length);
        var notifTitle = 'notifications enabled';
        var notifBody = 'this is a message\nwith multiple lines';
        // var notifBody = 'Created by '+games[randomItem].author+'.';
        // var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
        var options = {
            body: notifBody,
            // icon: notifImg
        }
        var notif = new Notification(notifTitle, options);
        // setTimeout(randomNotification, 30000);
        
        // var snd = new Audio('/blip.mp3');
        // snd.play();
    }
    
    function sendNotification() {
        // var randomItem = Math.floor(Math.random()*games.length);
        var notifTitle = 'time block for ' + task + ' complete';
        // var notifBody = 'you absolute piece of highway litter';
        // var notifBody = 'Created by '+games[randomItem].author+'.';
        // var notifImg = 'data/img/'+games[randomItem].slug+'.jpg';
        var options = {
            // body: notifBody,
            // icon: notifImg
        }
        var notif = new Notification(notifTitle, options);
        // setTimeout(randomNotification, 30000);
        
        var snd = new Audio('/blip.mp3');
        snd.play();
    }
    
    </script>
    
    
    <!-- FSM TEST -->
    
    <button on:click={handleNotificationAccess}>Request Notification Access</button>
    
    <!-- <h1> -->
    <pre>
    State: {state}
    {#if state==states.READY}
    Task: <input bind:value={task} placeholder="Task / Habit">
    Minutes: <input bind:value={timer_init} placeholder="x">
    {:else}
    Task: {task}
    {/if}
    </pre>
    <!-- </h1> -->
    <!-- Task: {task} -->
    
    {#if state==states.READY}
    <button on:click={handleOnReady}>Let's Begin</button>
    {/if}
    
    
    <!-- TIMER -->
    {#if state==states.COUNTDOWN}
    <!-- <h1> -->
    {minutes}:{(seconds > 9 ? seconds : "0"+seconds)}
    <!-- </h1> -->
    <button on:click={handleCancel}>Cancel</button>
    {/if}
    
    
    
    
    {#if state==states.COUNTDOWN_END}
    <!-- <h1> -->
    + {minutes}:{(seconds > 9 ? seconds : "0"+seconds)}
    <!-- </h1> -->
    
    <button on:click={handleFinish}>End Break</button>
    
    <pre>
    Adjust: reset countdown and last completed pomo to reflect that you haven't actually stopped working?
    </pre>
    
    {/if}
    
    <br>