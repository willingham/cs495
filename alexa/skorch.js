'use strict';
var request = require('request');
var apiAddress = 'http://connect.cthenderson.com:3001/api/';

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */

//     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
//         context.fail("Invalid Application ID");
//      }

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
        + ", sessionId=" + session.sessionId);

    var cardTitle = "Hello, World!"
    var speechOutput = "You can tell Hello, World! to say Hello, World!"
    callback(session.attributes,
        buildSpeechletResponse(cardTitle, speechOutput, "", true));
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
        + ", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // dispatch custom intents to handlers here
    if (intentName == 'JoinGame') {
        handleJoinRequest(intent, session, callback);
    }
    else if (intentName == 'LeaveGame') {
        handleLeaveRequest(intent, session, callback);
    }
    else if (intentName == 'UpdateGame') {
        handleUpdateRequest(intent, session, callback);
    }
    else if (intentName == 'QueryGame') {
        handleQueryRequest(intent, session, callback);
    }
    else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
        + ", sessionId=" + session.sessionId);

    // Add any cleanup logic here
}

function handleJoinRequest(intent, session, callback) {
    console.log("Attempting to join");
    var slots = intent.slots;
    var userId = session.user.userId;
    var json = {"alexa_id":userId, "game_phrase":slots["GamePhrase"]};
    var options = {
        url: apiAddress + 'join',
        method: 'POST',
        json: json
    };
    console.log("About to send request");
    request(options, function(err, res, body) {
        console.log("Response received");
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
            callback(session.attributes, buildSpeechletResponseWithoutCard(body, "", "true"));
        } else {
            callback(session.attributes, buildSpeechletResponseWithoutCard("An error occured.", "", "true"));
        }
    });
}
function handleLeaveRequest(intent, session, callback) {
    console.log("Attempting to leave");
    var userId = session.user.userId;
    var json = {"alexa_id":userId};
    var options = {
        url: apiAddress + 'leave',
        method: 'POST',
        json: json
    };
    console.log("About to send request");
    request(options, function(err, res, body) {
        console.log("Response received");
        console.log(res);
        console.log(res.statusCode);
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
            console.log(body);
            callback(session.attributes, buildSpeechletResponseWithoutCard(body, "", "true"));
        } else {
            callback(session.attributes, buildSpeechletResponseWithoutCard("An error occured.", "", "true"));
        }
    });
}
function handleUpdateRequest(intent, session, callback) {
    console.log("Attempting to update");
    var userId = session.user.userId;
    var slots = intent.slots;
    var json = {"alexa_id":userId, "action": slots["Action"], "entity": slots["Entity"]};
    var options = {
        url: apiAddress + 'update',
        method: 'POST',
        json: json
    };
    console.log("About to send request");
    request(options, function(err, res, body) {
        console.log("Response received");
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
            callback(session.attributes, buildSpeechletResponseWithoutCard(body, "", "true"));
        } else {
            callback(session.attributes, buildSpeechletResponseWithoutCard("An error occured.", "", "true"));
        }
    });
}
function handleQueryRequest(intent, session, callback) {
    console.log("Attempting to query");
    var userId = session.user.userId;
    var slots = intent.slots;
    var json = {"alexa_id":userId, "counter": slots["Counter"], "entity": slots["Entity"]};
    var options = {
        url: apiAddress + 'query',
        method: 'POST',
        json: json
    };
    console.log("About to send request");
    request(options, function(err, res, body) {
        console.log("Response received");
        if (res && (res.statusCode === 200 || res.statusCode === 201)) {
            callback(session.attributes, buildSpeechletResponseWithoutCard(body, "", "true"));
        } else {
            callback(session.attributes, buildSpeechletResponseWithoutCard("An error occured.", "", "true"));
        }
    });
}

// ------- Helper functions to build responses -------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        card: {
            type: "Simple",
            title: title,
            content: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
            text: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}