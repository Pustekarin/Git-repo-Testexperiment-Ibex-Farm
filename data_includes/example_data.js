var shuffleSequence = seq("intro", "demographics", sepWith("sep", seq("practice", rshuffle("s1", "s2", "f"))), sepWith("sep", rshuffle("q1", "q2")), "sr", "end");
var practiceItemTypes = ["practice"];

var defaults  = [
    "Separator", {
        transfer: "keypress",
        normalMessage: "Press space bar to continue.",
        errorMessage: "Wrong. Press space bar to continue."
    },
    "DashedSentence", {
        mode: "self-paced reading",
    },
    
    "Question", {
        hasCorrect: true 
    },
    "Message", {
        hideProgressBar: false 
    },
    "Form", {
        hideProgressBar: false,
        continueOnReturn: true ,
        saveReactionTime: true
    },
	"__SendResults__", {
        manualSendResults: true
    }
];

var items  = [

    // New in Ibex 0.3-beta-9. You can now add a '__SendResults__' controller in your shuffle
    // sequence to send results before the experiment has finished. This is NOT intended to allow
    // for incremental sending of results -- you should send results exactly once per experiment.
    // However, it does permit additional messages to be displayed to participants once the
    // experiment itself is over. If you are manually inserting a '__SendResults__' controller into
    // the shuffle sequence, you must set the 'manualSendResults' configuration variable to 'true', since
    // otherwise, results are automatically sent at the end of the experiment.
    //
    //["sr", "__SendResults__", { }],

    ["sep", "Separator", { }],

    // New in Ibex 0.3-beta19. You can now determine the point in the experiment at which the counter
    // for latin square designs will be updated. (Previously, this was always updated upon completion
    // of the experiment.) To do this, insert the special '__SetCounter__' controller at the desired
    // point in your running order. If given no options, the counter is incremented by one. If given
    // an 'inc' option, the counter is incremented by the specified amount. If given a 'set' option,
    // the counter is set to the given number. (E.g., { set: 100 }, { inc: -1 })
    //
    //["setcounter", "__SetCounter__", { }],

    //  NOTE: You could also use the 'Message' controller for the experiment intro (this provides a simple
    // consent checkbox).

    ["intro", "Form", {
        html: { include: "example_intro.html" },
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],

    ["demographics", "Form", {
        html: { include: "demographics.html" },
		jump: 0,
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],
	
	["end", "Form", {
        html: { include: "end.html" },
		showLink: 0,
        validators: {
            age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],
	
	["sr", "__SendResults__", { }],

    //
    // Three practice items for self-paced reading (one with a comprehension question).
    //
    ["practice", "DashedSentence", {s: "This is a practice sentence to get you used to reading sentences like this."}],
    ["practice", "DashedSentence", {s: "This is another practice sentence with a practice question following it."},
                 "Question", {hasCorrect: false , randomOrder: false,
                              q: "How would you like to answer this question?",
                              as: ["Press 1 or click here for this answer.",
                                   "Press 2 or click here for this answer.",
                                   "Press 3 or click here for this answer."]}],
    ["practice", "DashedSentence", {s: "This is the last practice sentence before the experiment begins."}],

    //
    // Two "real" (i.e. non-filler) self-paced reading items with corresponding acceptability judgment items.
    // There are two conditions.
    //

    [["s1",1], "DashedSentence", {s: "Item 1, condition 1"},
               "Question",       {q: "Question item 1", as: ["answer 1 to item 1", "answer 2 to item 1", "answer 3 to item 1"]}],
    /*[["s2",1], "DashedSentence", {s: "Item 1, condition 2"},
               "Question",       {q: "Question item 1", as: ["answer 1 to item 1", "answer 2 to item 1", "answer 3 to item 1"]}],

    // The first question will be chosen if the first sentence from the previous two items is chosen;
    // the second question will be chosen if the second sentence from the previous pair of items is chosen.

    [["s1",2], "DashedSentence", {s: "Item 2, condition 1."},
               "Question",       {q: "Question item 2",
                                  as: ["answer 1 to item 2",
                                       "answer 2 to item 2",
                                       "answer 3 to item 2"]}],
    [["s2",2], "DashedSentence", {s: "Item 2, condition 2"},
               "Question",       {q: "Question item 2", as: ["answer 1 to item 2",
                                                                      "answer 2 to item 2",
                                                                      "answer 3 to item 2"]}],
																	  
	[["s1",3], "DashedSentence", {s: "Item 3, condition 1"},
               "Question",       {q: "Question item 3", as: ["answer 1 to item 3", "answer 2 to item 3", "answer 3 to item 3"]}],
    [["s2",3], "DashedSentence", {s: "Item 3, condition 2"},
               "Question",       {q: "Question item 3", as: ["answer 1 to item 3", "answer 2 to item 3", "answer 3 to item 3"]}],

    [["s1",4], "DashedSentence", {s: "Item 4, condition 1"},
               "Question",       {q: "Question item 4",
                                  as: ["answer 1 to item 4",
                                       "answer 2 to item 4",
                                       "answer 3 to item 4"]}],
    [["s2",4], "DashedSentence", {s: "Item 4, condition 2"},
               "Question",       {q: "Question item 4", as: ["answer 1 to item 4",
                                                                      "answer 2 to item 4",
                                                                      "answer 3 to item 4"]}],
																	  
	[["s1",5], "DashedSentence", {s: "Item 5, condition 1"},
               "Question",       {q: "Question item 5",
                                  as: ["answer 1 to question 5",
                                       "answer 2 to question 5",
                                       "answer 3 to question 5"]}],
    [["s2",5], "DashedSentence", {s: "Item 5, condition 2"},
               "Question",       {q: "Question item 5", as: ["answer 1 to item 5",
                                                                      "answer 2 to item 5",
                                                                      "answer 3 to item 5"]}],
																	  
	[["s1",6], "DashedSentence", {s: "Item 6, condition 1"},
               "Question",       {q: "Question item 6", as: ["answer 1 to item 6", "answer 2 to item 6", "answer 3 to item 6"]}],
    [["s2",6], "DashedSentence", {s: "Item 6, condition 2"},
               "Question",       {q: "Question item 6", as: ["answer 1 to item 6", "answer 2 to item 6", "answer 3 to item 6"]}],

    [["s1",7], "DashedSentence", {s: "Item 7, condition 1"},
               "Question",       {q: "Question item 7",
                                  as: ["answer 1 to item 7",
                                       "answer 2 to item 7",
                                       "answer 3 to item 7"]}],
    [["s2",7], "DashedSentence", {s: "Item 7, condition 2"},
               "Question",       {q: "Question item 7", as: ["answer 1 to item 7",
                                                                      "answer 2 to item 7",
                                                                      "answer 3 to item 7"]}],
																	  
	[["s1",8], "DashedSentence", {s: "Item 8, condition 1"},
               "Question",       {q: "Question item 8",
                                  as: ["answer 1 to question 8",
                                       "answer 2 to question 8",
                                       "answer 3 to question 8"]}],
    [["s2",8], "DashedSentence", {s: "Item 8, condition 2"},
               "Question",       {q: "Question item 8", as: ["answer 1 to item 8",
                                                                      "answer 2 to item 8",
                                                                      "answer 3 to item 8"]}],
																	  
	[["s1",9], "DashedSentence", {s: "Item 9, condition 1"},
               "Question",       {q: "Question item 9", as: ["answer 1 to item 9", "answer 2 to item 9", "answer 3 to item 9"]}],
    [["s2",9], "DashedSentence", {s: "Item 9, condition 2"},
               "Question",       {q: "Question item 9", as: ["answer 1 to item 9", "answer 2 to item 9", "answer 3 to item 9"]}],

    [["s1",10], "DashedSentence", {s: "Item 10, condition 1"},
               "Question",       {q: "Question item 10",
                                  as: ["answer 1 to item 10",
                                       "answer 2 to item 10",
                                       "answer 3 to item 10"]}],
    [["s2",10], "DashedSentence", {s: "Item 10, condition 2"},
               "Question",       {q: "Question item 10", as: ["answer 1 to item 10",
                                                                      "answer 2 to item 10",
                                                                      "answer 3 to item 10"]}],*/

   

    //
    // 10 self-paced-reading filler sentences.
    //

    ["f", "DashedSentence", {s: "This is filler sentence 1."},
          "Question",       {q: "Question filler 1:", as: ["answer 1 to filler question 1", "answer 2 to filler question 1", "answer 3 to filler question 1"]}],

    /*["f", "DashedSentence", {s: "This is filler sentence 2."},
          "Question",       {q: "Question filler 2:",
                             as: ["answer 1 to filler question 2",
                                  "answer 2 to filler question 2",
                                  "answer 3 to filler question 2"]}],

    ["f", "DashedSentence", {s: "This is filler sentence 3."},
          "Question",       {q: "Question filler 3:",
                             as: ["answer 1 to filler question 3",
                                  "answer 2 to filler question 3",
                                  "answer 3 to filler question 3"]}],

    ["f", "DashedSentence", {s: "This is filler sentence 4."},
          "Question",       {q: "Question filler 4",
                             as: ["answer 1 to filler question 4", "answer 2 to filler question 4", "answer 3 to filler question 4"]}],

    ["f", "DashedSentence", {s: "This is filler sentence 5."},
          "Question",       {q: "Question filler 5", as: ["answer 1 to filler question 5", "answer 2 to filler question 5", "answer 3 to filler question 5"]}],

    ["f", "DashedSentence", {s: "This is filler sentence 6."},
          "Question",       {q: "Question filler 6",
                             as: ["answer 1 to filler question 6",
                                  "answer 2 to filler question 6",
                                  "answer 3 to filler question 6"]}],

    ["f", "DashedSentence", {s: "This is filler sentence 7."},
          "Question",       {q: "Question filler 7",
                             as: ["answer 1 to filler question 7",
                                  "answer 2 to filler question 7",
                                  "answer 3 to filler question 7"]}],

    ["f", "DashedSentence", {s: "This is filler sentence 8."},
          "Question",       {q: "Question filler 8",
                             as: ["answer 1 to filler question 8",
                                  "answer 2 to filler question 8",
                                  "answer 3 to filler question 8"]}],

    ["f", "DashedSentence", {s: "This is filler sentence 9 and apparently it has no question."}],

    ["f", "DashedSentence", {s: "This is filler sentence 10."},
          "Question",       {q: "Question filler 10",
                             as: ["answer 1 to filler question 10",
                                  "answer 2 to filler question 10",
                                  "answer 3 to filler question 10"]}]
								  */
	];