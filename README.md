PerformJS
-

A small JavaScript library that wraps around the Navigation Timing API providing information on user experience.  

###Syntax:  
You can view the stats by printing them to the **console** or as a **graph** in a web page. 

	perform.stats(); //Print to the browser console

	perform.stats(true); //Appends a graph to the document body element that compares the stats in a timeline format

###Currently measuring: 

- Page Load Time  
- Network Latency  
- Connection Time  
- DNS Latency  
- Document Load TIme

###TODO: 
1. Subtract the time the script loads from the stats so that we can get an accurate measure of performance.  
2. Continue tweaking the appearance of the graph displayed in the browser so that it can better represent how different stats compare to page load time.

----------
###Learning Resources  

- [Navigation Timing](https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/Overview.html) -The W3C specication of the Navigation Timing API.
- [Measuring Page Load Speed with Navigation Timing](http://www.html5rocks.com/en/tutorials/webperformance/basics/) - An article from HTML5ROCKS that gives a good introduction to the API.  
- [Making Facebook 2x Faster](https://www.facebook.com/note.php?note_id=307069903919) - A good read on website performance optimization from facebook documenting some techniques they used to make their site **2x** faster.