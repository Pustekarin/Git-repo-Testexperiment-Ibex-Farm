var shuffleSequence = seq("intro", "demographics", sepWith("sep", seq("practice", rshuffle("s1", "s2", "f"))), sepWith("sep", rshuffle("q1", "q2")), "sr", "end");
var practiceItemTypes = ["practice"];

var practiceItemMessage = ["PRESS SPACE BAR"];

var defaults  = [
    "Separator", {
        transfer: "keypress",
        normalMessage: "Press space bar to continue.",
        errorMessage: "Wrong. Press space bar to continue."
    },
    "DashedSentence", {
        mode: "self-paced reading",
    },
	/*"practiceItemTypes", {
		practiceItemMessage: "PRESS SPACE BAR"
	},*/
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
    } ],

    ["demographics", "Form", {
        html: { include: "demographics.html" },
		jump: 0,
        validators: {
            age: function (s) { if (s.match(/^\d{2}$/)) return true; else return "Bad value for \u2018age\u2019"; }
            //age: function (s) { if (s.match(/^\d+$/)) return true; else return "Bad value for \u2018age\u2019"; }
        }
    } ],
	
	["end", "Form", {
        html: { include: "end.html" },
		showLink: 0,
    } ],
	
	["sr", "__SendResults__", { }],

    //
    // Three practice items for self-paced reading (one with a comprehension question).
    //
    ["practice", "DashedSentence", {s: "This is a practice sentence to get you used to reading sentences like this."}],
    ["practice", "DashedSentence", {s: "This is another practice sentence with a practice question following it."},
                 "Question", {hasCorrect: false , randomOrder: false,
                              q: "How would you like to answer this question?",
                              as: ["Press 1 for this answer.",
                                   "Press 2 for this answer.",
                                   "Press 3 for this answer."]}],
    ["practice", "DashedSentence", {s: "This is the last practice sentence before the experiment begins."}],

    //
    // Two "real" (i.e. non-filler) self-paced reading items with corresponding acceptability judgment items.
    // There are two conditions.
    //

    [["s1",1], "DashedSentence", {s: "The bank rejected the customer without letting her know why."},
               "Question",       {q: "What did the bank do?", 
									as: ["Reject the customer.", 
										"Let the customer know about the rejection.", 
										"Inform the customer."]}],
    [["s2",1], "DashedSentence", {s: "The bank rejected the customer without letting him know why."},
               "Question",       {q: "What did the bank do?", 
									as: ["Reject the customer.", 
										"Let the customer know about the rejection.", 
										"Inform the customer."]}],

    // The first question will be chosen if the first sentence from the previous two items is chosen;
    // the second question will be chosen if the second sentence from the previous pair of items is chosen.

    [["s1",2], "DashedSentence", {s: "The song comforted the child by getting her to sleep."},
               "Question",       {q: "What effect did the song have on the child?",
                                  as: ["The child fell asleep.",
                                       "The child woke up.",
                                       "It made the child cry."]}],
    [["s2",2], "DashedSentence", {s: "The song comforted the child by getting him to sleep."},
               "Question",       {q: "What effect did the song have on the child?", 
									as: ["The child fell asleep.",
                                         "The child woke up.",
                                         "It made the child cry."]}],
																	  
	[["s1",3], "DashedSentence", {s: "The dogs rescued the human by dragging her out of the fire."},
               "Question",       {q: "By whom was the person rescued?", 
									as: ["Dogs.", 
										"Police.", 
										"Firefighters."]}],
    [["s2",3], "DashedSentence", {s: "The dogs rescued the human by dragging him out of the fire."},
               "Question",       {q: "By whom was the person rescued?", as: ["Dogs.", "Police.", "Firefighters."]}],

    [["s1",4], "DashedSentence", {s: "The hospital saved the infant by keeping her in an incubator."},
               "Question",       {q: "How was the infant saved?",
                                  as: ["By keeping the infant in an incubator.",
                                       "By bringing the infant to another hospital.",
                                       "By performing surgery on the infant."]}],
    [["s2",4], "DashedSentence", {s: "The hospital saved the infant by keeping him in an incubator."},
               "Question",       {q: "How was the infant saved?", 
									as: ["By keeping the infant in an incubator.",
                                         "By bringing the infant to another hospital.",
                                         "By performing surgery on the infant."]}],
																	  
	[["s1",5], "DashedSentence", {s: "The police helped the victim by protecting her day and night."},
               "Question",       {q: "What did the police do?",
                                  as: ["Protect the victim.",
                                       "Persecute the offender day and night.",
                                       "Arrest the victim."]}],
    [["s2",5], "DashedSentence", {s: "The police helped the victim by protecting him day and night."},
               "Question",       {q: "What did the police do?", 
									as: ["Protect the victim.",
                                         "Persecute the offender day and night.",
                                         "Arrest the victim."]}],
																	  
	[["s1",6], "DashedSentence", {s: "The agency charged the tourist without informing her about it."},
               "Question",       {q: "What is the tourist’s problem?", 
									as: ["The tourist paid for something without knowing about it.", 
										"The tourist didn’t have an agency.", 
										"The tourist couldn’t contact the agency."]}],
    [["s2",6], "DashedSentence", {s: "The agency charged the tourist without informing him about it."},
               "Question",       {q: "What is the tourist’s problem?", 
									as: ["The tourist paid for something without knowing about it.", 
									"The tourist didn’t have an agency.", 
									"The tourist couldn’t contact the agency."]}],

    [["s1",7], "DashedSentence", {s: "The club expelled the member without giving her the notice."},
               "Question",       {q: "What did the club do?",
                                  as: ["Expel the member.",
                                       "Notify the member.",
                                       "Accept the member."]}],
    [["s2",7], "DashedSentence", {s: "The club expelled the member without giving him the notice."},
               "Question",       {q: "What did the club do?", 
									as: ["Expel the member.",
                                         "Notify the member.",
                                         "Accept the member."]}],
																	  
	[["s1",8], "DashedSentence", {s: "The family welcomed the guest by accommodating her in their house."},
               "Question",       {q: "What did the guest do?",
                                  as: ["Stay at the family’s house.",
                                       "Welcome the family.",
                                       "Ask the family for accommodation."]}],
    [["s2",8], "DashedSentence", {s: "The family welcomed the guest by accommodating him in their house."},
               "Question",       {q: "What did the guest do?", 
									as: ["Stay at the family’s house.",
                                         "Welcome the family.",
                                         "Ask the family for accommodation."]}],
																	  
	[["s1",9], "DashedSentence", {s: "The dating agency helped the single by coupling her with a partner."},
               "Question",       {q: "Did the single find a partner?", 
									as: ["Yes.", 
										"No.", 
										"Yes, but without the help of the dating agency."]}],
    [["s2",9], "DashedSentence", {s: "The dating agency helped the single by coupling him with a partner."},
               "Question",       {q: "Did the single find a partner?", 
									as: ["Yes.", 
										"No.", 
										"Yes, but without the help of the dating agency."]}],

    [["s1",10], "DashedSentence", {s: "The service hotline helped the user by guiding her through the process."},
               "Question",       {q: "What did the user do?",
                                  as: ["Call a service hotline.",
                                       "Try to understand the process alone.",
                                       "Read the manual."]}],
    [["s2",10], "DashedSentence", {s: "The service hotline helped the user by guiding him through the process."},
               "Question",       {q: "What did the user do?", 
									as: ["Call a service hotline.",
                                         "Try to understand the process alone.",
                                         "Read the manual."]}],
	
	[["s1",11], "DashedSentence", {s: "The newspaper thanked the reader by mentioning her in an article."},
               "Question",       {q: "How did the newspaper thank the reader?",
                                  as: ["They mentioned the reader in an article.",
                                       "They dedicated an article to the reader.",
                                       "They sent a thank-you letter."]}],
    [["s2",11], "DashedSentence", {s: "The newspaper thanked the reader by mentioning him in an article."},
               "Question",       {q: "How did the newspaper thank the reader?", 
									as: ["They mentioned the reader in an article.",
                                         "They dedicated an article to the reader.",
                                         "They sent a thank-you letter."]}],
										 
	[["s1",12], "DashedSentence", {s: "The murderer intimidated the witness by calling her every day."},
               "Question",       {q: "Who called the witness?",
                                  as: ["The murderer.",
                                       "The police.",
                                       "The thief."]}],
    [["s2",12], "DashedSentence", {s: "The murderer intimidated the witness by calling him every day."},
               "Question",       {q: "Who called the witness?", 
									as: ["The murderer.",
                                         "The police.",
                                         "The thief."]}],
    
	[["s1",13], "DashedSentence", {s: "The teenagers congratulated their friend by surprising her with a party."},
               "Question",       {q: "How did the teenagers congratulate their friend?",
                                  as: ["With a surprise party.",
                                       "With presents.",
                                       "With a greeting card."]}],
    [["s2",13], "DashedSentence", {s: "The teenagers congratulated their friend by surprising him with a party."},
               "Question",       {q: "How did the teenagers congratulate their friend?", 
									as: ["With a surprise party.",
                                         "With presents.",
                                         "With a greeting card."]}],
										 
	[["s1",14], "DashedSentence", {s: "The Smiths surprised their neighbour by inviting her to their party."},
               "Question",       {q: "Who invited the neighbour to their party?",
                                  as: ["The Smiths.",
                                       "The Millers.",
                                       "The Johnsons."]}],
    [["s2",14], "DashedSentence", {s: "The Smiths surprised their neighbour by inviting him to their party."},
               "Question",       {q: "Who invited the neighbour to their party?", 
									as: ["The Smiths.",
                                         "The Millers.",
                                         "The Johnsons."]}],
										 
	[["s1",15], "DashedSentence", {s: "The hospital released the patient without charging her for the stay."},
               "Question",       {q: "What did the hospital do?",
                                  as: ["Release the patient.",
                                       "Make the patient pay for the stay.",
                                       "Overcharge the patient."]}],
    [["s2",15], "DashedSentence", {s: "The hospital released the patient without charging him for the stay."},
               "Question",       {q: "What did the hospital do?", 
									as: ["Release the patient.",
                                         "Make the patient pay for the stay.",
                                         "Overcharge the patient."]}],
										 
	[["s1",16], "DashedSentence", {s: "The children obeyed the adult without questioning her strict rules."},
               "Question",       {q: "Did the children do what the adult told them to?",
                                  as: ["Yes.",
                                       "No.",
                                       "Sometimes."]}],
    [["s2",16], "DashedSentence", {s: "The children obeyed the adult without questioning his strict rules."},
               "Question",       {q: "Did the children do what the adult told them to?", 
									as: ["Yes.",
                                         "No.",
                                         "Sometimes."]}],
    
	[["s1",17], "DashedSentence", {s: "The university expelled the student without informing her about it."},
               "Question",       {q: "What did the university do?",
                                  as: ["Expel the student.",
                                       "Inform the student.",
                                       "Enroll the student."]}],
    [["s2",17], "DashedSentence", {s: "The university expelled the student without informing him about it."},
               "Question",       {q: "What did the university do?", 
									as: ["Expel the student.",
                                         "Inform the student.",
                                         "Enroll the student."]}],
										 
	[["s1",18], "DashedSentence", {s: "The grandparents cared for the baby by feeding her with milk."},
               "Question",       {q: "Who cared for the baby?",
                                  as: ["The grandparents.",
                                       "The parents.",
                                       "A nanny."]}],
    [["s2",18], "DashedSentence", {s: "The grandparents cared for the baby by feeding him with milk."},
               "Question",       {q: "Who cared for the baby?", 
									as: ["The grandparents.",
                                         "The parents.",
                                         "A nanny."]}],
										 
	[["s1",19], "DashedSentence", {s: "The investigators found the person by backtracking her last purchases."},
               "Question",       {q: "Who found the person?",
                                  as: ["The investigators.",
                                       "The police.",
                                       "The detective."]}],
    [["s2",19], "DashedSentence", {s: "The investigators found the person by backtracking his last purchases."},
               "Question",       {q: "Who found the person?", 
									as: ["The investigators.",
                                         "The police.",
                                         "The detective."]}],
										 
	[["s1",20], "DashedSentence", {s: "The school called the parent for letting her know about the trip."},
               "Question",       {q: "Why did the school call the parent?",
                                  as: ["To inform the parent about the trip.",
                                       "To let the parent know that the trip was cancelled.",
                                       "To ask the parent to join the trip."]}],
    [["s2",20], "DashedSentence", {s: "The school called the parent for letting him know about the trip."},
               "Question",       {q: "Why did the school call the parent?", 
									as: ["To inform the parent about the trip.",
                                         "To let the parent know that the trip was cancelled.",
                                         "To ask the parent to join the trip."]}],
										 

    //
    // 10 self-paced-reading filler sentences.
    //

    ["f", "DashedSentence", {s: "The host entertained his guests by playing them a folk song."},
          "Question",       {q: "How did the host entertain the guests?", 
							as: ["By playing a song.", 
								"By singing them a song.", 
								"By dancing to a folk song."]}],

    ["f", "DashedSentence", {s: "The teacher punished the students by giving them bad grades."},
          "Question",       {q: "What did the teacher do?",
                             as: ["He punished the students.",
                                  "He warned the students.",
                                  "He rewarded the students with good grades."]}],

    ["f", "DashedSentence", {s: "The children scared the pigeons by chasing them around the plaza."},
          "Question",       {q: "What did the children do?",
                             as: ["Scare the pigeons.",
                                  "Feed the pigeons.",
                                  "Watch the pigeons at the plaza."]}],

    ["f", "DashedSentence", {s: "The boy lost the scissors before using them even once."},
          "Question",       {q: "How often did the boy use the scissors?",
                             as: ["He never used them.", 
								"He used them once.", 
								"Many times."]}],

    ["f", "DashedSentence", {s: "The government lowered the taxes after raising them hadn’t helped."},
          "Question",       {q: "Did raising the taxes have the desired effect?", 
							as: ["No.", 
								"Yes.", 
								"To some extent."]}],

    ["f", "DashedSentence", {s: "The party won the elections by manipulating them heavily."},
          "Question",       {q: "Who manipulated the elections?",
                             as: ["The party.",
                                  "The government.",
                                  "The dictator."]}],

    ["f", "DashedSentence", {s: "The owner trained the dog by rewarding it after every command."},
          "Question",       {q: "Who taught the dog commands?",
                             as: ["The owner.",
                                  "A dog trainer.",
                                  "The boy."]}],

    ["f", "DashedSentence", {s: "The firefighter saved the cat by rescuing it from the tree."},
          "Question",       {q: "How was the cat saved?",
                             as: ["By a firefighter.",
                                  "It jumped from the tree.",
                                  "It was rescued by the owner."]}],

    ["f", "DashedSentence", {s: "The veterinary released the horse by putting it to sleep."},
		  "Question",       {q: "What animal did the veterinary put to sleep?",
                             as: ["A horse.",
                                  "A dog.",
                                  "A cat."]}],

    ["f", "DashedSentence", {s: "The immigrant learnt the language by using it every day."},
          "Question",       {q: "How did the immigrant learn the language?",
                             as: ["By using it on a daily basis.",
                                  "By studying really hard.",
                                  "By taking private classes."]}],

	["f", "DashedSentence", {s: "The boy handed in his essay without checking it for errors."},
          "Question",       {q: "Who checked the essay before it was handed in?",
                             as: ["No one.",
                                  "The boy.",
                                  "The parents."]}],

    ["f", "DashedSentence", {s: "The builder tested the electricity by turning it on and off."},
          "Question",       {q: "What did the builder do?",
                             as: ["Check the electricity.",
                                  "Turn off the electricity.",
                                  "Install the electricity."]}]
	];