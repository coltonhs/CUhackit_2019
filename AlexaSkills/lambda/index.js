// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');
const request = require('request');

// Initial Skill Launch Handler
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Ready to cook! For a list of options say Alexa, Help.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

// Help Intent Handler
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'I can tell you a list of items available for you to cook if you say: Alexa, What can I cook? If you already know an available item that you want to cook, such as a hamburger, you can say: Alexa, I want to cook a hamburger. If you would like to exit the cooking simulation you can say: Alexa, Exit. <break time="5s"/>';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

// Lists the Item Menu
const ListMenuIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ListMenuIntent';
    },
    handle(handlerInput) {
        const speechText = 'Currently, I can only help you cook one of the following: Burgers or Pizza <break time="2s"/>';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

// Lists the creators
const CreditsIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'Credits';
    },
    handle(handlerInput) {
        const speechText = 'The creators of this cooking simulation are: Colton Smith, Aaron Mason, Chloe Worthy, and Andrew Padgett<break time="5s"/>';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

// Sends request to Unity to spawn in recipe
const UnityLoadRecipeIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'UnityLoadRecipeIntent';
    },
    handle(handlerInput) {
        const slots = handlerInput.requestEnvelope.request.intent.slots;
        const food = slots['Food'].value;
        var speechText = 'Preparing ingredients for the ${food}.<break time="5s"/>';
        
        request({url:`https://cookingvr.herokuapp.com/?command=create ${food}`, auth: { json: true}} , (err, res, body) => {
        if (err) {
            speechText = `Preparing ingredients for the ${food}.<break time="5s"/>`
        } else {
            speechText = 'unable to process the request.'
            return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
        }
        });
        
        switch(food) {
            case "cheeseburger":
            case "hamburger":
            case "burger":
                speechText += 'To begin preparing any type of burger, First you must preheat the stove and place your meat on the stove.<break time="2s"/> Leave your meat on the stove until it is cooked to a desirable rarity. <break time="2s"/> Once your burger is done cooking, get the buns ready and place the burger on top off the bottom bun. <break time="1s"/> Finally any desired topping on and finish the burger with the top bun.<break time="3s"/> Would you like to cook anything else? If yes, ask me what else can I cook, or say: Alexa, exit to quit'
                break;
            case "pizza":
                speechText += ''
                break;
            case "sandwich":
                speechText += 'TEST SANDWICH'
                break;
            default:
                speechText = `Sorry, I cannot cook ${food}`
                break;
        }
        
        return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(false)
        .getResponse();
    }
};

// Lists the creators
const EasterEggIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'EasterEggIntent';
    },
    handle(handlerInput) {
        const speechText = 'Sorry, Ice cream machine broke.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

// Exit Skill Handler
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Thank you for cooking! Please cook with me again sometime!';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
};

// Fallback Intent Handler
const FallBackIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speechText = 'Sorry, I can\'t do that right now, for a list of commands say: Alexa, Help<break time="5s"/>';
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(false)
            .getResponse();
    }
};

// End Session Intent Handler
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};

// The intent reflector is used for interaction model testing and debugging.
// It will simply repeat the intent the user said. You can create custom handlers
// for your intents by defining them above, then also adding them to the request
// handler chain below.
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speechText = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const speechText = `Sorry, I couldn't understand what you said. Please try again.`;

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

// This handler acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ListMenuIntentHandler,
        CreditsIntentHandler,
        UnityLoadRecipeIntentHandler,
        EasterEggIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallBackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler) // make sure IntentReflectorHandler is last so it doesn't override your custom intent handlers
    .addErrorHandlers(
        ErrorHandler)
    .lambda();