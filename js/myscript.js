// Student Name: Junhui Xie
// Student ID: 991338100
// File Name: myscript.js

var rowID; 		// use rowID to hold the data when user selects the book
var xmlData; 	

$(document).on("pagecreate", "#home", function() {
	// use ajax to retrieve xml data
	$.ajax({
		type: "GET", url: "a2.xml", dataType: "xml",
		success: function(xml) {
			getXML(xml);
		},
		// show error message when the page loads wrong 
		error: function(e) {
			alert(e.status + "-" + e.statusText);
		}
	});
});

function getXML(xml) {
	console.log("in getXML");
	console.log(xml);
	var n=0;
	// store xml data to xmlData
	xmlData = xml;
	
	// add title to the main page
	$("h1").html($(xml).find("siteTitle").text());
	// get the personal information from xml and add to the main page
	$(".footer").append("Student Name: " + $(xml).find("studentName").text() + "<br>" +
						"Student ID: " + $(xml).find("studentName").attr("studentNumber") + "<br>" +
						"Program: " + $(xml).find("studentName").attr("program"));
	$(".footer").css("text-align", "center").css("font-family", "Arial").css("font-size", "15px");
	
	// loop through the book node
	$(xml).find("book").each(function() {
		// find the book name 
		$("#b"+n).append("<p class='bookName'>" + $(this).find("name").text() + "</p>");
		// display the picture and link to another page
		$("#b"+n).append("<a href='#book'>" +
						 "<p class='image'>" + "<img src='images/" + 
							$(this).find("name").attr("image") + 
					     "' width='112'>" + "</p>" + "</a>");
		$(".book"+n).html($(this).find("name").text());
		n++;
	});	// end of the loop	
}

$(document).on("pagebeforeshow", "#book", function() {
	console.log(xmlData);
	// show which row is selected in the console
	console.log(rowID);  
	// call parseXML method
	parseXML(xmlData, rowID);
});

// store the value to rowID when user clicks the button
$(document).on("click", "section >div", function() {
	rowID = $(this).closest("div").attr("value");
});

function parseXML(xml, rowID) {
	// retrieve the information based on the rowID
	$("div#img").html("<img src='images/" + 
							$(xml).find("book:nth(" + rowID + ")").find("name").attr("image") +
						"' width='170'>");
	$("div#info").html("<b>Book Name:</b> " + 
							$(xml).find("book:nth(" + rowID + ")").find("name").text() +
						"<br>" + 
						"<b>Author Name:</b> " + 
							$(xml).find("book:nth(" + rowID + ")").find("authorName").text() +
						"<br>" + 
						"<b>Publisher Name:</b> " + 
							$(xml).find("book:nth(" + rowID + ")").find("publisherName").text() +
						"<br>" + 
						"<b>Book Type:</b> " + 
							$(xml).find("book:nth(" + rowID + ")").find("description").attr("type") +
						"<br>" + 
						"<b>Current Price:</b> " + 
							$(xml).find("book:nth(" + rowID + ")").find("currentPrice").text() +
						"<br>" + 
						"<b>Description:</b> " + 
							$(xml).find("book:nth(" + rowID + ")").find("description").text() +
						"<br>");
}

// parse xml data from navigation bar
$(document).on("click", ".book0", function() {
	rowID = 0; 
	parseXML(xmlData, rowID);
});
$(document).on("click", ".book1", function() {
	rowID = 1; 
	parseXML(xmlData, rowID);
});
$(document).on("click", ".book2", function() {
	rowID = 2; 
	parseXML(xmlData, rowID);
});
$(document).on("click", ".book3", function() {
	rowID = 3; 
	parseXML(xmlData, rowID);
});










